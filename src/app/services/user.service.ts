import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44343/api/";
  constructor(private httpClient:HttpClient) { }
  getUser(email:any):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"users/getbyemail?email="+email);
  }
  update(user:User):Observable<SingleResponseModel<User>>{

    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl+"users/update/",user);

  }
  updatePassword(user:any):Observable<SingleResponseModel<User>>{
    let newPath  =`https://localhost:44343/api/Users/update/`;
    console.log(newPath);
    console.log(user);
    return this.httpClient.post<SingleResponseModel<User>>(newPath,user);
  }
}
