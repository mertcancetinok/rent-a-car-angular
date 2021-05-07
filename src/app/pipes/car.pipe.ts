import { Pipe, PipeTransform } from '@angular/core';
import { CarDetails } from '../models/carDetails';

@Pipe({
  name: 'carPipe'
})
export class CarPipe implements PipeTransform {

  transform(value: CarDetails[], filterTextCar:string): CarDetails[] {
    filterTextCar = filterTextCar?filterTextCar.toLocaleLowerCase():"";
    return filterTextCar ? value.filter((c:CarDetails)=>c.carName.toLocaleLowerCase().indexOf(filterTextCar)!==-1):value;
  }

}
