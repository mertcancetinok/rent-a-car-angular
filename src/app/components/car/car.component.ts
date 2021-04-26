import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarImage } from 'src/app/models/carImage';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carImages:CarImage[] = [];
  dataLoaded = false;
  constructor(private carService: CarService,private carImageService:CarImagesService) {}

  ngOnInit(): void {
    this.getCars();
    this.getCarImages();
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarImages(){
    this.carImageService.getCarImages().subscribe((response)=>{
      this.carImages = response.data;
    })

  }

}
