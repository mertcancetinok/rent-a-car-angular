import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  set(key:string,value:string){
    localStorage.setItem(key,value)
  }
  get(key:string){
    return localStorage.getItem(key)
  };
  clear(){
    localStorage.clear();
  }
  setToken(value:string){
    localStorage.setItem("token",value);
  }
  add(key:string,value:string){
    localStorage.setItem(key,value);
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
  getToken(){
    return localStorage.getItem("token");
  }
}
