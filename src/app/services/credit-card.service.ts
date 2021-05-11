import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = "https://localhost:44343/api/";
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcard/getall";
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
  add(creditCard:CreditCard){
    return this.httpClient.post(this.apiUrl+"creditcard/add/",creditCard);
  }
  getCardById(cardId:string){
    let newPath = this.apiUrl + "creditcard/getbyid?id="+cardId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath)
  }
}
