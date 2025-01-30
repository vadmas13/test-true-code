import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ProductDtoBase, ProductUpdateDto } from './dto';
import { PaginationModel } from '@share';
import { ProductModel, ProductPriceRange } from './models';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { mapProductsQueryParams } from './mappers';
import {
    getCashProductKey,
    getProductListFilters,
    isNeedCache,
    getProductListPagination,
} from './utils';
import { productCacheKey } from './consts';

@Injectable()
export class ProductService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async create(dto: ProductDtoBase, file?: Express.Multer.File) {
        const result = await this.prismaService.product.create({
            data: { ...dto, photoBytes: file?.buffer },
        });

        if (!result) {
            throw new BadRequestException('Непредвиденная ошибка создания товара');
        }

        await this.cacheManager.del(productCacheKey);

        return result;
    }

    async update({ id, ...dto }: ProductUpdateDto, file?: Express.Multer.File) {
        const result = await this.prismaService.product.update({
            where: { id },
            data: { ...dto, photoBytes: file?.buffer },
        });

        if (!result) {
            throw new BadRequestException('Непредвиденная ошибка обновления товара');
        }

        await this.cacheManager.del(productCacheKey);
        await this.cacheManager.del(getCashProductKey(id));

        return result;
    }

    async getProducts(req: Request): Promise<PaginationModel<ProductModel[]>> {
        const { query } = req;
        const queryParams = mapProductsQueryParams(query);

        // кэшируем ток первую страницу без фильтров и сортировок
        const needCacheData = isNeedCache(queryParams);

        if (needCacheData) {
            const cacheData = await this.cacheManager.get<PaginationModel<ProductModel[]>>(
                productCacheKey,
            );
            if (cacheData) {
                return cacheData;
            }
        }

        const data = await this.prismaService.productView.findMany({
            where: getProductListFilters(queryParams.filters),
            orderBy: queryParams.sort,
            ...getProductListPagination(queryParams.pagination),
        });

        const count = await this.prismaService.productView.count({
            where: getProductListFilters(queryParams.filters),
        });
        const result: PaginationModel<ProductModel[]> = {
            data,
            totalCount: count,
            pageSize: queryParams.pagination.pageSize,
            page: queryParams.pagination.page,
            lastPage: Math.ceil(count / queryParams.pagination.pageSize),
        };

        if (needCacheData) {
            await this.cacheManager.set(productCacheKey, result);
        }

        return result;
    }

    async getProduct(productId: string) {
        // Ищем в кэше по идентификатору
        const cacheProduct = await this.cacheManager.get(getCashProductKey(productId));
        if (cacheProduct) {
            return cacheProduct;
        }
        // Иначе ищем в кэше списка
        const cacheListProduct = await this.cacheManager.get<PaginationModel<ProductModel[]>>(
            productCacheKey,
        );
        const productFromCacheList = cacheListProduct?.data?.find((x) => x.id === productId);
        if (productFromCacheList) {
            await this.cacheManager.set(getCashProductKey(productId), productFromCacheList);
            return productFromCacheList;
        }

        // Иначе возвращаем из бд
        const product = await this.prismaService.productView.findFirst({
            where: { id: productId },
        });

        await this.cacheManager.set(getCashProductKey(productId), product);

        if (!product) {
            throw new NotFoundException(`Товар с id=${productId} - не найден`);
        }
        return product;
    }

    async deleteProduct(id: string) {
        const result = await this.prismaService.product.delete({ where: { id } });
        if (result) {
            await this.cacheManager.del(getCashProductKey(id));
        }

        return result;
    }

    getPriceRange() {
        return this.prismaService.productAttributes.findFirst();
    }
}
