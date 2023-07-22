import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryAddDto } from 'src/app/Dtos/Dashboard/CategoryAddDto';
import { CategoryEditDto } from 'src/app/Dtos/Dashboard/CategoryEditDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly myClient: HttpClient) { }

  private readonly BaseUrl = "https://localhost:7064/api/Categories/Dashboard/";

  public GetAllCategories() {
    return this.myClient.get(this.BaseUrl + "GetAllCategories")
  }

  public GetById(categoryId: any) {
    return this.myClient.get("https://localhost:7064/api/Categories/" + categoryId)
  }

  public AddCategory(credentials: CategoryAddDto): Observable<any> {
    return this.myClient.post(this.BaseUrl + "AddCategory", credentials);
  }

  public EditCategory(credentials: CategoryEditDto): Observable<any> {
    return this.myClient.put(this.BaseUrl + "EditCategory", credentials);
  }

  public DeleteCategory(categoryId: any) {
    return this.myClient.delete(this.BaseUrl + "DeleteCategory/" + categoryId);
  }

  public Categories$ = new BehaviorSubject<any>(null)
}
