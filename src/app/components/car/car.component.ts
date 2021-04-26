import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarImage } from 'src/app/models/carImage';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carImages:CarImage[] = [];
  dataLoaded = false;
  constructor(private carService: CarService,private carImageService:CarImagesService,private sanitizer: DomSanitizer) {}

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
      this.sanitizer.bypassSecurityTrustResourceUrl("C:\Users\mertc\Desktop\ReCapProject\WebAPI\CarImages\e59f821b-aa08-4e74-8d26-6ce9c3f5fbd3.jpg");
    })

  }

}
