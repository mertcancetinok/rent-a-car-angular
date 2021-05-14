import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CarfilterComponent } from './components/car-filter/car-filter.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';


const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarfilterComponent},
  {path:"cars/color/:colorId",component:CarfilterComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarfilterComponent},
  {path:"cars/detail/:carId",component:CarDetailComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"rentals/add/:carId",component:RentalAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
