import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { selectOpt } from '../interfaces/selectOpt';
import { landOwner } from '../interfaces/landOwner';
import { adminOwner } from '../interfaces/adminOwner';

var ownerLs: landOwner[] = []
var adminLs: adminOwner[] = []

@Component({
  selector: 'app-building-assessment',
  templateUrl: './building-assessment.component.html',
  styleUrls: ['./building-assessment.component.sass']
})
export class BuildingAssessmentComponent implements OnInit {

  ownersLs = new MatTableDataSource(ownerLs)
  adminsLs = new MatTableDataSource(adminLs)

  bldgOpt: selectOpt[] = [
    { value: 'DISCOVERY/NEW DECLARATION', viewVal: 'DISCOVERY/NEW DECLARATION (DC)' },
    { value: 'SUBDIVISION', viewVal: 'SUBDIVISION (SD)' },
    { value: 'CONSOLIDATION', viewVal: 'CONSOLIDATION (CS)' },
    { value: 'PHYSICAL CHANGE', viewVal: 'PHYSICAL CHANGE (PC)' },
    { value: 'DISPUTE IN ASSESSD VALUE', viewVal: 'DISPUTE IN ASSESSD VALUE (DP)' },
    { value: 'TRANSFER', viewVal: 'TRANSFER (TR)' },
    { value: 'SEGREGATION', viewVal: 'SEGREGATION (SG)' },
    { value: 'RECLASSIFICATIO', viewVal: 'RECLASSIFICATION (RC)' },
    { value: 'SPECIAL PROJECT', viewVal: 'SPECIAL PROJECT (SP)' },
  ]

  //Kind Of Building Options
  kof: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Cert of Completion Options
  coc: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Structural Type Options
  st: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Cert. of Occupancy Options
  occu: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Date Constructed/Completed Options
  dcc: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Permit Issue Options
  pio: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Date Occupied Options
  dteOcc: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Building Floors Options
  bflr: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Floor Area Options
  flrA: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Floor With Same Area Options
  flrArea1: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  flrArea2: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //flooring -floors w/ same mats
  flrArea3: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  flrArea4: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  flrArea5: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  flrArea6: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Materials Options
  matsOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //structuralDesc Bldg. flrs.
  bldgflrsOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  bldgflrsOpts2: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]
  //walls and partitions bldg. flrs.

  //structuralDesc Mats
  mats2: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //walls and partition
  mats3: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //floortypeOpts
  floortypeOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //buildingFloors4
  buildingFlrsOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //additionalItemsOpts
  aItemOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //subTypeOpts
  stOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //propertyAppraisal Type of Building Opts
  toBldg: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //bldgRating Opts
  bRating: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //propertyAssessment Actual Use Opts
  actualUseOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //propertyAsmt Status Opts
  statsOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //Quarter Opts
  qrtrOpts: selectOpt[] = [
    { value: 'Option 1', viewVal: 'Option 1' },
    { value: 'Option 1', viewVal: 'Option 2' },
    { value: 'Option 1', viewVal: 'Option 3' },
    { value: 'Option 1', viewVal: 'Option 4' },
    { value: 'Option 1', viewVal: 'Option 5' },
  ]

  //year Opts
  yrOpts: selectOpt[] = [
    { value: '2019', viewVal: '2019' },
    { value: '2018', viewVal: '2018' },
    { value: '2017', viewVal: '2017' },
    { value: '2016', viewVal: '2016' },
    { value: '2015', viewVal: '2015' },
  ]

  public bldgAssessment: FormGroup;

  constructor(private router: Router) { }

  ownerHeader: string[] = ['name', 'address', 'contact', 'tin', 'actions']
  adminHeader: string[] = ['name', 'address', 'contact', 'tin', 'actions']

  //Structural Desc Table
  strDescHeader: string[] = ['Floor No.', 'Area', 'Flooring Material', 'Wall Material', 'Floor Height', 'Standard Height', 'Adjusted Basic Rate', 'Floor Type']
  //Additional Item Table
  aItemHeader: string[] = ['aItm', 'sType', 'sizem2', 'untCost', 'totalC']

  ngOnInit() {
    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/login'])
    }
    this.initializeForm()
  }

  addOwner() {
    let ownerData = this.bldgAssessment.get('ownerDetails').value
    ownerLs.push({
      ownName: ownerData.ownfName + ' ' + ownerData.ownmName + ' ' + ownerData.ownlName,
      ownAddress: ownerData.ownaddress,
      ownContact: ownerData.owncontact,
      ownTIN: ownerData.ownTIN
    })
    this.ownersLs = new MatTableDataSource(ownerLs)
    Object.keys(this.bldgAssessment.controls['ownerDetails'].controls).forEach(key => {
      this.bldgAssessment.controls['ownerDetails'].controls[key].reset()
    })
  }

  addAdmin() {
    let adminData = this.bldgAssessment.get('adminOwnerLs').value
    adminLs.push({
      admName: adminData.admfName + ' ' + adminData.admmName + ' ' + adminData.admlName,
      admAddress: adminData.admaddress,
      admContact: adminData.admcontact,
      admTIN: adminData.admTIN
    })
    this.adminsLs = new MatTableDataSource(adminLs)
    Object.keys(this.bldgAssessment.controls['adminOwnerLs'].controls).forEach(key => {
      this.bldgAssessment.controls['adminOwnerLs'].controls[key].reset()
    })
  }

  removeAdminDetail(evt: any) {
    _.remove(adminLs, evt)
    this.adminsLs = new MatTableDataSource(adminLs)
  }

  removeOwnerDetail(evt: any) {
    _.remove(ownerLs, evt)
    this.ownersLs = new MatTableDataSource(ownerLs)
  }

  initializeForm() {
    this.bldgAssessment = new FormGroup({
      bldgCode: new FormControl('', [Validators.required]),
      arpNo: new FormControl('', [Validators.required]),

      //PIN
      pin: new FormGroup({
        city: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        barangay: new FormControl('', [Validators.required]),
        section: new FormControl('', [Validators.required]),
        parcel: new FormControl('', [Validators.required])
      }),

      //ownerDetails
      ownerDetails: new FormGroup({
        ownfName: new FormControl(''),
        ownmName: new FormControl(''),
        ownlName: new FormControl(''),
        ownaddress: new FormControl(''),
        owncontact: new FormControl(''),
        ownTIN: new FormControl(''),
      }),

      //admin
      adminOwnerLs: new FormGroup({
        admfName: new FormControl(''),
        admmName: new FormControl(''),
        admlName: new FormControl(''),
        admaddress: new FormControl(''),
        admcontact: new FormControl(''),
        admTIN: new FormControl(''),
      }),

      //buildingLocation
      numSt: new FormControl(''),
      city: new FormControl(''),
      prov: new FormControl(''),
      brgy: new FormControl(''),
      subd: new FormControl(''),

      //landReference
      landRef: new FormGroup({
        lndOwnr: new FormControl(''),
        lndcloa: new FormControl(''),
        lndsno: new FormControl(''),
        lndlotno: new FormControl(''),
        lndblkno: new FormControl(''),
        lndarp: new FormControl(''),
        lndarea: new FormControl(''),
      }),

      //generalDescription
      genDescG: new FormGroup({
        genDesc: new FormControl('', [Validators.required]),
        certcom: new FormControl('', [Validators.required]),
        certOcc: new FormControl('', [Validators.required]),
        strType: new FormControl('', [Validators.required]),
        bldgPNo: new FormControl(''),
        dateCC: new FormControl('', [Validators.required]),
        permitIssue: new FormControl('', [Validators.required]),
        dateOccupied: new FormControl('', [Validators.required]),
        cct: new FormControl(''),
        aob: new FormControl('', [Validators.required]),
      }),

      //structuralDescription
      strDescG: new FormGroup({
        numStorey: new FormControl('', [Validators.required]),
        bldgflrs: new FormControl(''),
        flrArea: new FormControl(''),
        chckBoxFlrA: new FormControl(''),
        flr1: new FormControl(''),
        flr2: new FormControl(''),
        flr3: new FormControl(''),
        flr4: new FormControl(''),
        flr5: new FormControl(''),
        flr6: new FormControl(''),
        mats: new FormControl(''),
        othrs: new FormControl(''),
        othrs2: new FormControl(''),
        othrs3: new FormControl(''),
        othrsCB: new FormControl(''),
        othrsCB2: new FormControl(''),
        othrsCB3: new FormControl(''),
        bldgflrs2: new FormControl(''),
        bldgflrs3: new FormControl(''),
        mats2: new FormControl(''),
        mats3: new FormControl(''),
        flrsameMatsCB: new FormControl(''),
        flrsameMatsCB2: new FormControl(''),
        flrsameMatsCB3: new FormControl(''),

        flrheight: new FormControl(''),
        stndrdheight: new FormControl(''),
        xcessDefHeight: new FormControl(''),

        basicRatePerMeter: new FormControl(''),
        basicRateVal: new FormControl(''),
        aCost: new FormControl(''),

        adjstdBasicRate: new FormControl(''),
        floortype: new FormControl(''),
        buildingFlrs: new FormControl(''),

        totalArea: new FormControl(''),
        totalCost: new FormControl(''),
      }),//structuralDescription END

      //additionalItems
      additionalItems: new FormGroup({
        aItem: new FormControl(''),
        subType: new FormControl(''),
        szem2: new FormControl('', [Validators.required]),
        uCost: new FormControl(''),
        tCost: new FormControl(''),
        aItemTotal: new FormControl(''),
      }),

      //propertyAppraisal
      propertyAppraisal: new FormGroup({
        unPainted: new FormControl(''),
        scndhndMat: new FormControl(''),
        tob: new FormControl('', [Validators.required]),
        bldgRating: new FormControl('', [Validators.required]),
        untConstCost: new FormControl(''),
        subTotal: new FormControl(''),
        CoAiSubTotal: new FormControl(''),
        totalConstCost: new FormControl(''),
        depRate: new FormControl(''),
        totalDep: new FormControl(''),
        depCost: new FormControl(''),
        marketVal: new FormControl(''),
      }),

      //propertyAssessment
      propertyAssessment: new FormGroup({
        actualUse: new FormControl('', [Validators.required]),
        propAsmtMarketVal: new FormControl(''),
        AsmtLevel: new FormControl(''),
        AsmtVal: new FormControl(''),
        spclClass: new FormControl(''),
        status: new FormControl('', [Validators.required]),
        qrtr: new FormControl('', [Validators.required]),
        yr: new FormControl('', [Validators.required]),
        propAsmtTotal: new FormControl(''),
        appraisedBy: new FormControl(''),
        appraisedByDate: new FormControl(''),
        recommending: new FormControl(''),
        recommendingDate: new FormControl(''),
        approvedBy: new FormControl(''),
        approvedByDate: new FormControl(''),
        txtArea: new FormControl('', [Validators.required]),
      }),

      //Record of Superseded Assessment
      rsa: new FormGroup({
        rsaPin: new FormControl(''),
        rsaArp: new FormControl(''),
        rsaTD: new FormControl(''),
        totalAssessVal: new FormControl(''),
        prevOwner: new FormControl(''),
        effectivityAsmt: new FormControl(''),
        recper: new FormControl(''),
        rsaDate: new FormControl(''),
      }),
    })
  }


}

export default BuildingAssessmentComponent
