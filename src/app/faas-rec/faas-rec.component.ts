import { Component, OnInit } from '@angular/core';
import { selectOpt } from '../interfaces/selectOpt';
import { searchRec } from '../services/searchFaasRec.service';


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

  constructor(private sRec: searchRec) { }

  ngOnInit() {
  }

  arpNo: any;
  surveyNo: any;
  octtct: any;
  lotNo: any;
  streetNo: any;
  barangay: any;
  subdv: any;
  city: any;
  province: any;
  north: any;
  south: any;
  east: any;
  west: any;
  owners: any = [];
  lClass: any;
  lsubClass: any;
  area: any;
  unitVal: any;
  baseMVal: any;
  totalBaseMVal: any;
  actualUse: any;
  paMVal: any;
  paAssessLvl: any;
  paAssessVal: any;
  paTotalAssessVal: any;
  search() {
    this.owners = [];
    let data: any = {
      SearchIn: this.param1,
      SearchBy: this.param2,
      info: this.req
    }
    this.sRec.search(data).subscribe(res => {
      let resdata = res.data;
      this.arpNo = resdata.landfaas.arp_no;
      this.surveyNo = resdata.landfaas.survey_no;
      this.octtct = resdata.landfaas.OCT_TCT_no;
      this.lotNo = resdata.landfaas.lot_no;
      this.streetNo = resdata.landfaas.street_no;
      this.barangay = resdata.landfaas.barangay;
      this.subdv = resdata.landfaas.subdivision;
      this.city = resdata.landfaas.city;
      this.province = resdata.landfaas.province;
      this.north = resdata.landfaas.north;
      this.south = resdata.landfaas.south;
      this.east = resdata.landfaas.east;
      this.west = resdata.landfaas.west;
      this.lClass = resdata.landfaas.class;
      this.lsubClass = resdata.landfaas.subclass;
      this.area = resdata.landfaas.area;
      this.unitVal = resdata.landfaas.unit_value;
      this.baseMVal = resdata.landfaas.base_market_value;
      this.totalBaseMVal = resdata.landfaas.total_base_market_value;
      this.actualUse = resdata.landfaas.pa_actual_use;
      this.paMVal = resdata.landfaas.pa_market_value;
      this.paAssessLvl = resdata.landfaas.pa_assessment_value;
      this.paAssessVal = resdata.landfaas.pa_assessed_value;
      this.paTotalAssessVal = resdata.landfaas.pa_total_assessed_value;
      for (let i = 0; i < resdata.owner.length; i++) {
        this.owners.push(resdata.owner[i]);
      }
      console.log(resdata);
    });
  }

}

export default FaasRecComponent;
