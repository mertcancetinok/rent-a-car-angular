import { Component, OnInit } from '@angular/core';
import { CarDetails } from 'src/app/models/carDetails';
import { CarService } from 'src/app/services/car.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarImage } from 'src/app/models/carImage';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetails[] = [];
  cars:Car[] = [];
  carImages: CarImage[] = [];
  dataLoaded = false;
  constructor(
    private carService: CarService,
    private carImageService: CarImagesService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      }else if(params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      }
    });
    this.getCarsDetails();
  }
  getCarsDetails() {
    this.carService.getCarsDetails().subscribe((response) => {

      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarImagesById(carId:number){
    this.carImageService.getCarImagesById(carId).subscribe(response=>{
      this.carImages=response.data;
      console.log(this.carImages);
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
}
