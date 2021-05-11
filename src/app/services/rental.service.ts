import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetails } from '../models/rentalDetails';
import { Rental } from '../models/rental';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44343/api/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetails>>{
    let newPath = this.apiUrl + "rentals/getAll";
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath);
  }
  getRentalsByCarId(carId:number){
    let newPath = this.apiUrl + "rentals/getallbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  addRental(rental:Rental){
    return this.httpClient.post<ListResponseModel<Rental>>(this.apiUrl+"rentals/add/",rental);
  }

}
