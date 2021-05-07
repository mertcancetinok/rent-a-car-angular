import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandPipe'
})
export class BrandPipe implements PipeTransform {

  transform(value: Brand[], filterTextBrand:string): Brand[] {
    filterTextBrand = filterTextBrand ? filterTextBrand.toLocaleLowerCase():"";
    return filterTextBrand ? value.filter((b:Brand)=>b.name.toLocaleLowerCase().indexOf(filterTextBrand)!==-1):value;
  }

}
