import { Component, OnInit } from '@angular/core';
import { selectOpt } from '../interfaces/selectOpt';
import { searchRec } from '../services/searchFaasRec.service';
import { landTaxTable } from '../interfaces/landTaxTable';
import { landTaxInfOwn } from '../interfaces/landTaxInfOwn';
import { landTaxInfAdm } from '../interfaces/landTaxInfAdm';
import { MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';

var ltTableLs: landTaxTable[] = []
var ltTableInfOwner: landTaxInfOwn[] = []
var ltTableInfAdmin: landTaxInfAdm[] = []

@Component({
  selector: 'app-land-tax',
  templateUrl: './land-tax.component.html',
  styleUrls: ['./land-tax.component.scss']
})
export class LandTaxComponent implements OnInit {

  LTTable = new MatTableDataSource(ltTableLs);
  LTTableInfOwn = new MatTableDataSource(ltTableInfOwner);
  LTTableInfAdm = new MatTableDataSource(ltTableInfAdmin);

  lTaxHeader: string[] = [
    'arpNo','pin','surveyNo','lotNo','blockNo',
    'streetNo','brgy','subd','city','province',
    'class','subclass','area','assessedVal','stat'
  ];

  lTaxInfHeaderOwn: string[] = [
    'ownName', 'ownAddress', 'ownContact', 'ownTIN'
  ];

  lTaxInfHeaderAdm: string[] = [
    'admName', 'admAddress', 'admContact', 'admTIN'
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
    ltTableInfOwner = []
    ltTableInfAdmin = []
    this.LTTable = new MatTableDataSource(ltTableLs);
    this.LTTableInfOwn = new MatTableDataSource(ltTableInfOwner);
    this.LTTableInfAdm = new MatTableDataSource(ltTableInfAdmin);
    let reqdata: any = {
      SearchIn: this.param1,
      SearchBy: this.param2,
      info: this.req,
    }
    this.srchRec.search(reqdata).subscribe(res => {
      let resdata = res.data;
      let landFaas = resdata.landfaas;
      let owner = resdata.owner;
      let admin = resdata.admin;
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
      });
      _.forEach(owner, arr => {
        _.forEach(arr, arr => {
          ltTableInfOwner.push({
            ownName: arr.first_name + ' ' + arr.middle_name + ' ' + arr.last_name,
            ownAddress: arr.address,
            ownContact: arr.contact,
            ownTIN: arr.TIN
          })
        })
      });
      _.forEach(admin, arr => {
        _.forEach(arr, arr => {
          ltTableInfAdmin.push({
            admName: arr.first_name + ' ' + arr.middle_name + ' ' + arr.last_name,
            admAddress: arr.address,
            admContact: arr.contact,
            admTIN: arr.TIN
          })
        })
      });
      this.LTTable = new MatTableDataSource(ltTableLs);
      this.LTTableInfOwn = new MatTableDataSource(ltTableInfOwner);
      this.LTTableInfAdm = new MatTableDataSource(ltTableInfAdmin);
    });
  }

}

export default LandTaxComponent