import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';


@Injectable({
  providedIn: 'root'
})
export class CarImagesService {
  apiUrl = "https://localhost:44343/api";
  constructor(private httpClient:HttpClient) { }
  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"/carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  };
  getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"/carimages/getbyid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
