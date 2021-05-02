import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetails } from '../models/carDetails';
import { Car } from '../models/car';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44343/api/";
  constructor(private httpClient:HttpClient) { }
  getCarsDetails():Observable<ListResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarsDetailsById(carId:number):Observable<ListResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorid?id="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
