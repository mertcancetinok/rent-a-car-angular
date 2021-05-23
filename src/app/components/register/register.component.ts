import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormBuilder,Validators,FormArray} from "@angular/forms";
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private route:Router,private localStorageService:LocalStorageService ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }
  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        if(response.success){
          this.localStorageService.setToken(response.data.token);
          this.localStorageService.add("email",this.registerForm.value["email"])
          this.toastrService.success("",response.message)
          this.route.navigate([""])
        }
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Formu kontrol edin.");
    }
  }

}
