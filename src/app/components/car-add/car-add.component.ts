import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands:Brand[];
  colors:Color[];
  dataLoaded = false;
  carAddForm:FormGroup;
  carImageAddForm:FormGroup;
  constructor(private brandService:BrandService,private colorService:ColorService,private formBuilder:FormBuilder,private toastrService:ToastrService,private carService:CarService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      name:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  };
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  };
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }
  get brandId(){
    return this.carAddForm.get('brandId');
  }
  selectBrandChangeHandler(e:any){
    this.brandId?.setValue(e.target.value,{
      onlySelf:true
    })
    console.log(e.target.value)
  }
  get colorId(){
    return this.carAddForm.get('colorId');
  }
  selectColorChangeHandler(e:any){
    this.colorId?.setValue(e.target.value,{
      onlySelf:true
    })
    console.log(e.target.value)
  }
  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        this.toastrService.error(responseError.error.Message)
        for(let i = 0;i<responseError.error.ValidationErros.length;i++){
          this.toastrService.error(responseError.error.ValidationErros[i].ErrorMessage)
        }
      })
    }else{
      this.toastrService.error("Form has a some error.Please fix its.","Error")
    }

  }

}
