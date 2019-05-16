import { Component, OnInit } from '@angular/core';
import { selectOpt } from '../interfaces/selectOpt';

@Component({
  selector: 'app-faas-rec',
  templateUrl: './faas-rec.component.html',
  styleUrls: ['./faas-rec.component.sass']
})
export class FaasRecComponent implements OnInit {

  param1: string;
  param2: string;
  req: string;
  params1: selectOpt[] = [
    { value: 'land', viewVal: 'Land' },
    { value: 'building', viewVal: 'Building' },
  ];
  params2: selectOpt[] = [
    { value: 'pin', viewVal: 'PIN' },
    { value: 'arpNo', viewVal: 'ARP No.' },
    { value: 'name', viewVal: 'Name' },
  ];

  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log(this.param1 + ' ' + this.param2 + ' ' + this.req)
  }

}

export default FaasRecComponent;
