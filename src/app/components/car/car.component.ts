import { Component, OnInit } from '@angular/core';
import { CarDetails } from 'src/app/models/carDetails';
import { CarService } from 'src/app/services/car.service';

import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetails[] = [];
  cars:Car[] = [];
  brands:Brand[] = [];
  colors:Color[];
  currentImagePath:string;
  dataLoaded = false;
  filterTextCar:string = "";
  selectedColor:string;
  selectedBrand:string;
  constructor(
    private carService: CarService,
    private activedRoute: ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.getCarsDetails();
      this.getBrands();
      this.getColors();
      if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      }else if(params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      }
    });

  }
  getCarsDetails() {
    this.carService.getCarsDetails().subscribe((response) => {

      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }


  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {

      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {

      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
    })
  }

}
