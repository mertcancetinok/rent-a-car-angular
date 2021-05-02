import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetails';
import { CarImage } from 'src/app/models/carImage';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails:CarDetails[];
  carImages:CarImage[];
  currentImage:CarImage;
  dataLoaded=false;
  constructor(private carService:CarService,private carImageService:CarImagesService,private activedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsDetailsById(params['carId']);
        this.getCarImagesById(params['carId']);
        setTimeout(() => {
          this.currentImage=this.carImages[0];
      }, 400)
      }
    });

  }
  getCarsDetailsById(carId:number) {
    this.carService.getCarsDetailsById(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });

  };
  getCarImagesById(id:number){
    this.carImageService.getCarImagesById(id).subscribe(response=>{
      console.log(response.data)
      this.carImages=response.data;
      this.dataLoaded=true;
    })
  }
  setCurrentImage(carImage:CarImage){
    this.currentImage = carImage;
    console.log(this.currentImage)
  }
  getCurrentImageClass(carImage:CarImage){
    if(carImage==this.currentImage){
      return "carousel-item active"
    }else{
      return "carousel-item"
    }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
