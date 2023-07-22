import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductChildDto } from 'src/app/Dtos/Product/ProductChildDto';
import { ProductFilterationPaginationResultDto } from 'src/app/Dtos/Product/ProductFilterationPaginationResultDto';
import ProductPaginationDto from 'src/app/Dtos/Product/ProductPaginationDto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly myClient: HttpClient) {}

  private readonly ProductDetails_URL = 'https://localhost:7064/api/Products/';

  private readonly RelatedProducts_URL =
    'https://localhost:7064/api/Products/RelatedProducts/';

  private readonly Brands_URL = 'https://localhost:7064/api/Categories';

  private readonly Filteration_URL =
    'https://localhost:7064/api/Products/Filter';

  GetProductDetailsById(id: any) {
    return this.myClient.get(this.ProductDetails_URL + id);
  }

  GetRelatedProducts(brand: any) {
    return this.myClient.get(this.RelatedProducts_URL + brand);
  }

  GetAllBrands() {
    return this.myClient.get(this.Brands_URL);
  }

  filterProducts(filter: any): Observable<ProductChildDto[]> {
    return this.myClient.post<ProductChildDto[]>(this.Filteration_URL, filter);
  }

  Search(filter: any): Observable<ProductChildDto[]> {
    return this.myClient.post<ProductChildDto[]>(this.Filteration_URL, filter);
  }

  GetAllProductsInPagination(
    page: number,
    countPerPage: number
  ): Observable<ProductPaginationDto> {
    return this.myClient.get<ProductPaginationDto>(
      `https://localhost:7064/api/Products/${page}/${countPerPage}`
    );
  }

  GetFilteredProductsInPagination(
    filter: any,
    page: number,
    countPerPage: number
  ): Observable<ProductFilterationPaginationResultDto> {
    return this.myClient.post<ProductFilterationPaginationResultDto>(
      `https://localhost:7064/api/Products/PaginationFilter/${page}/${countPerPage}`,
      filter
    );
  }
}
