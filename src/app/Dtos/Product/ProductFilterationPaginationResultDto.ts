import { ProductFilterationResultDto } from "./ProductFilterationResultDto";

export interface ProductFilterationPaginationResultDto {
    filteredProducts: ProductFilterationResultDto[];
    totalCount: number;
}