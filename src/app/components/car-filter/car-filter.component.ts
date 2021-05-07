import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarfilterComponent implements OnInit {
  cars:Car[];
  dataLoaded = false;
  constructor(private carService:CarService,private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params=>{
      if(params['brandId'] && params['colorId']){
        console.log("her ikisi çalıştı");
        this.getCarsByBrandAndColor(params['brandId'],params['colorId']);
      }
      else if(params['brandId']){
        this.getCarsByBrandId(params['brandId']);
        console.log("brand çalıştı");
      }else if(params['colorId']) {
        this.getCarsByColorId(params['colorId']);
        console.log("color çalıştı");
      }
    })
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
  getCarsByBrandAndColor(brandId: number,colorId: number){
    this.carService.getCarsByColorIdAndBrandId(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded = true;
    })
  }
}
