import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarImageResponseModel } from '../models/carImageResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarImagesService {
  apiUrl = "https://localhost:44343/api/carimages/getall";
  constructor(private httpClient:HttpClient) { }
  getCarImages():Observable<CarImageResponseModel>{
    return this.httpClient.get<CarImageResponseModel>(this.apiUrl);
  }
}
