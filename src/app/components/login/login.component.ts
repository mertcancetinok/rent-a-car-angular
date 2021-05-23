import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private localStorageService:LocalStorageService,private toastrService:ToastrService,private route:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("",response.message)
        this.localStorageService.set("email",this.loginForm.value["email"])
        this.localStorageService.setToken(response.data.token);
        window.location.href="/cars";
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Formu kontrol edin.");
    }
  }

}
