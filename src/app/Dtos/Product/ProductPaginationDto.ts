import { ProductChildDto } from "./ProductChildDto";

export default class ProductPaginationDto {
    products: ProductChildDto[]=[];
    totalCount: number=0;
} 