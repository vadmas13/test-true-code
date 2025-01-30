import { IsNotEmpty, IsPositiveInt, IsString, IsUnique, MaxLength } from '@share';
import { Validate } from 'class-validator';

export class ProductDtoBase {
    @IsString()
    @IsNotEmpty()
    @Validate(IsUnique, ['product', 'name'])
    @MaxLength(50)
    name: string;
    @MaxLength(2000)
    description?: string;
    @IsNotEmpty()
    @IsPositiveInt()
    price: number;
    @IsPositiveInt()
    discountedPrice: number;
    @IsNotEmpty()
    @IsPositiveInt()
    @Validate(IsUnique, ['product', 'article'])
    article: number;
}

export class ProductUpdateDto extends ProductDtoBase {
    @IsString()
    @IsNotEmpty()
    id: string;
}
