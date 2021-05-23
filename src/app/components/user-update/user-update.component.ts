import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user:User;
  userUpdateForm:FormGroup;
  constructor(private userService:UserService,private formBuilder:FormBuilder,private toastrService:ToastrService,private localStorageService:LocalStorageService,private route:Router) { }

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();
  }
  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      password:["",Validators.required],
      newPassword:["",Validators.required],
      passwordSalt:["",Validators.required],
      passwordHash:["",Validators.required],
      email:["",Validators.required]
    })
  }
  editUser(user:User){
    this.userUpdateForm.patchValue({
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      passwordSalt:user.passwordSalt,
      passwordHash:user.passwordHash,
      email:user.email
    });
  }
  getUser(){
    this.userService.getUser(localStorage.getItem("email")).subscribe(response=>{
        this.editUser(response.data)
    })
  }
  update(){
    let userForm = Object.assign({},this.userUpdateForm.value);
    this.userService.update(userForm).subscribe(response=>{
      if(response.success){
        this.localStorageService.clear();
        alert(response.message)
        window.location.href = "/cars";
      }
    },responseError=>{
      this.toastrService.error(responseError.error);
    })
  }
  passwordUpdate(){
    let userForm = Object.assign({},this.userUpdateForm.value);
    this.userService.update(userForm).subscribe(response=>{
      if(response.success){
        this.localStorageService.clear();
        alert(response.message)
        window.location.href = "/cars";
      }
    },responseError=>{
      console.log(responseError.error.message)
      this.toastrService.error(responseError.error.message)

    })

  }
}
