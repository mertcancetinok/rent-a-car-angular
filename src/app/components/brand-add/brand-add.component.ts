import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brands:Brand[];
  brandAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private toastrService:ToastrService) {

  }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }
  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
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
