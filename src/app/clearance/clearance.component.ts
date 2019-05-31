import { Component, OnInit } from '@angular/core';
import { selectOpt } from '../interfaces/selectOpt';
import { searchRec } from '../services/searchFaasRec.service';
import { landTaxTable } from '../interfaces/landTaxTable';
import { landTaxInfOwn } from '../interfaces/landTaxInfOwn';
import { landTaxInfAdm } from '../interfaces/landTaxInfAdm';
import { genLandTaxCl } from '../services/genLandTaxCl';
import { MatTableDataSource } from '@angular/material';
import { lTaxClearance } from '../classes/lTaxClearance';
import * as _ from 'lodash';

var ltTableLs: landTaxTable[] = []
var ltTableInfOwner: landTaxInfOwn[] = []
var ltTableInfAdmin: landTaxInfAdm[] = []

@Component({
  selector: 'app-clearance',
  templateUrl: './clearance.component.html',
  styleUrls: ['./clearance.component.scss']
})
export class ClearanceComponent implements OnInit {


  LTTable = new MatTableDataSource(ltTableLs);
  LTTableInfOwn = new MatTableDataSource(ltTableInfOwner);
  LTTableInfAdm = new MatTableDataSource(ltTableInfAdmin);

  input1: string;
  amount: string;
  CTONo: string;
  dated: string;
  requestor: string;
  purpose: string;
  encoder1: string;
  date: string;
  certfee: string;
  amt: string;
  orNo: string;
  remarks: string;


  lTaxHeader: string[] = [
    'arpNo', 'pin', 'surveyNo', 'lotNo', 'blockNo',
    'streetNo', 'brgy', 'subd', 'city', 'province',
    'class', 'subclass', 'area', 'assessedVal', 'stat'
  ];

  lTaxInfHeaderOwn: string[] = [
    'ownName', 'ownAddress', 'ownContact', 'ownTIN'
  ];

  lTaxInfHeaderAdm: string[] = [
    'admName', 'admAddress', 'admContact', 'admTIN'
  ];

  constructor(private srchRec: searchRec, private genFile: genLandTaxCl) { }

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

  prps: selectOpt[] = [
    { value: 's1', viewVal: 'Cancellation/Registration of mortgage contract' },
    { value: 's2', viewVal: 'Transfer of ownership' },
    { value: 's3', viewVal: 'Bank Loan/Pag-ibig Loan' },
    { value: 's4', viewVal: 'Business Permit' },
    { value: 's5', viewVal: 'Others: For whatever legal purpose' },
  ]

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

  genCl() {
    let data: lTaxClearance = {
      current_date: '',
      owner_names: '',
      pin: '',
      arp_no: '',
      location: '',
      assessed_value: '',
      payment_reason: this.input1,
      total_amount: this.amount,
      cto_no: this.CTONo,
      name_of_requestor: this.requestor,
      purpose: '',
      verified_by: '',
      by_name1: '',
      by_title1: '',
      certification_fee: this.certfee,
      or_no: this.orNo,
      date: this.date,
      amount: this.amt,
      by_name2: '',
      by_title2: '',
      remarks: this.remarks
    };

    this.genFile.lTaxCl(data);
  }

}
