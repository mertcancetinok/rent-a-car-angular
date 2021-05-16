import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  car:Car;
  carUpdateForm:FormGroup;
  constructor(private activedRoute:ActivatedRoute,private carService:CarService,private formBuilder:FormBuilder,private toastrService:ToastrService) {

   }

  ngOnInit(): void {
    this.getCarById(this.activedRoute.snapshot.params.carId)
    this.createCarUpdateForm();

  }
  createCarUpdateForm(){

    this.carUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }
  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.editCar(response.data)
    })
  }
  editCar(car:Car){
    this.carUpdateForm.patchValue({
      id:car.id,
      name:car.name,
      brandId:car.brandId,
      colorId:car.colorId,
      modelYear:car.modelYear,
      dailyPrice:car.dailyPrice,
      description:car.description
    });
  }
  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        this.toastrService.error(responseError.error.Message)
        for(let i = 0;i<responseError.error.ValidationErros.length;i++){
          this.toastrService.error(responseError.error.ValidationErros[i].ErrorMessage)
        }
      })
    }
  }

}
