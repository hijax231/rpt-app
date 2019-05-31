import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class genLandTaxCl {


  lTaxCl(data: any): void {
    console.log(data)
  }
}