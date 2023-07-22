import { ProductReadDto } from "./ProductReadDto";

export interface ProductReadPaginationDto {
    products: ProductReadDto[];
    totalCount: number;
}