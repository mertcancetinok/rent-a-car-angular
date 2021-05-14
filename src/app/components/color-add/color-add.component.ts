import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colors:Color[];
  colorAddForm:FormGroup;
  constructor(private colorService:ColorService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name:["",Validators.required],
    })
  }
  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
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
