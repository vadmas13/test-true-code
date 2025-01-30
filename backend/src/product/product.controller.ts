import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    Put,
    Req,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { imagesFileTypeRegex, MAX_PICTIRE_SIZE, QueryRequired } from '@share';
import { ProductDtoBase, ProductUpdateDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { TransformNumbers } from '@share';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @TransformNumbers('price', 'article', 'discountedPrice')
    @UseInterceptors(FileInterceptor('file'))
    create(
        @UploadedFile(
            new ParseFilePipe({
                fileIsRequired: false,
                validators: [
                    new MaxFileSizeValidator({ maxSize: MAX_PICTIRE_SIZE }),
                    new FileTypeValidator({ fileType: imagesFileTypeRegex }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Body() dto: ProductDtoBase,
    ) {
        return this.productService.create(dto, file);
    }

    @Put()
    @TransformNumbers('price', 'article', 'discountedPrice')
    @UseInterceptors(FileInterceptor('file'))
    update(
        @UploadedFile(
            new ParseFilePipe({
                fileIsRequired: false,
                validators: [
                    new MaxFileSizeValidator({ maxSize: MAX_PICTIRE_SIZE }),
                    new FileTypeValidator({ fileType: imagesFileTypeRegex }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Body() dto: ProductUpdateDto,
    ) {
        return this.productService.update(dto, file);
    }

    @Get('list')
    getList(@Req() req: Request) {
        return this.productService.getProducts(req);
    }

    @Get()
    getProduct(@QueryRequired('id') id: string) {
        return this.productService.getProduct(id);
    }

    @Get('priceRange')
    getPriceRange() {
        return this.productService.getPriceRange();
    }

    @Delete()
    deleteProduct(@QueryRequired('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}
