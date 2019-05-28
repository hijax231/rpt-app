import { Component, OnInit } from '@angular/core';
import { selectOpt } from '../interfaces/selectOpt';
import { searchRec } from '../services/searchFaasRec.service';
import { landTaxTable } from '../interfaces/landTaxTable';
import { MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';

var ltTableLs: landTaxTable[] = []

@Component({
  selector: 'app-land-tax',
  templateUrl: './land-tax.component.html',
  styleUrls: ['./land-tax.component.scss']
})
export class LandTaxComponent implements OnInit {

  LTTable = new MatTableDataSource(ltTableLs);

  lTaxHeader: string[] = [
    'arpNo','pin','surveyNo','lotNo','blockNo',
    'streetNo','brgy','subd','city','province',
    'class','subclass','area','assessedVal','stat'
  ];

  constructor(private srchRec: searchRec) { }

  ngOnInit() {
  }

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

  search() {
    ltTableLs = []
    this.LTTable = new MatTableDataSource(ltTableLs);
    let reqdata: any = {
      SearchIn: this.param1,
      SearchBy: this.param2,
      info: this.req,
    }
    this.srchRec.search(reqdata).subscribe(res => {
      let resdata = res.data;
      let landFaas = resdata.landfaas;
      console.log(resdata);
      _.forEach(landFaas, arr => {
        ltTableLs.push({
          arpNo: arr.ARPNo,
          pin: arr.PIN,
          surveyNo: arr.SurveyNo,
          lotNo: arr.LotNo,
          blockNo: arr.BlockNo,
          streetNo: arr.StreetNo,
          brgy: arr.Barangay,
          subd: arr.Subdivision,
          city: arr.City,
          province: arr.Province,
          class: arr.Class,
          subclass: arr.SubClass,
          area: arr.Area,
          assessedVal: arr.AssessedValue,
          stat: arr.Status
        });
      })
      this.LTTable = new MatTableDataSource(ltTableLs);
      
    });
  }

}

export default LandTaxComponent