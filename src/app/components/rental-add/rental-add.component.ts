import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/carDetails';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  carDetails:CarDetails[];
  rentalAddForm:FormGroup;
  minDate: Date;
  carId:number;
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private rentalService:RentalService,private activedRoute:ActivatedRoute,private carService:CarService) {

   }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params=>{
      if(params['carId']){
        this.carId=params['carId'];
        this.getCarById();
      }
    })
    this.minDate = new Date();
    this.createRentalAddForm();
  }
  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      carId: [""],
      customerId: [2],
      rentDate: ["",Validators.required],
      returnDate: ["",Validators.required]
    })
  }
  getCarById(){
    return this.carService.getCarsDetailsById(this.carId).subscribe(response=>{
      this.carDetails = response.data;
    })
  }
  add(){

    if(this.rentalAddForm.valid){
      this.rentalAddForm.patchValue({
        carId:this.carId
      })
      console.log(this.rentalAddForm.value)
      let rentalModel = Object.assign({},this.rentalAddForm.value);
      this.rentalService.addRental(rentalModel).subscribe(response=>{
        console.log(response);
      })
    }
  }
}
