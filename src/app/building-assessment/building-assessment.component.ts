import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

//export interface bldgOwner {
	//ownName: string;
	//ownAddress: string;
	//ownContact: string;
	//ownTIN: string;
//}

export interface selectOpt {
	value: string;
	viewVal: string;
}

//var ownerLs: bldgOwner[] = []

@Component({
  selector: 'app-building-assessment',
  templateUrl: './building-assessment.component.html',
  styleUrls: ['./building-assessment.component.sass']
})
export class BuildingAssessmentComponent implements OnInit {
	//ownersLs = new MatTableDataSource(ownerLs)

  bldgOpt: selectOpt[] = [
    { value:'DISCOVERY/NEW DECLARATION', viewVal:'DISCOVERY/NEW DECLARATION (DC)' },
		{ value:'SUBDIVISION', viewVal:'SUBDIVISION (SD)' },
		{ value:'CONSOLIDATION', viewVal:'CONSOLIDATION (CS)' },
		{ value:'PHYSICAL CHANGE', viewVal:'PHYSICAL CHANGE (PC)' },
		{ value:'DISPUTE IN ASSESSD VALUE', viewVal:'DISPUTE IN ASSESSD VALUE (DP)' },
		{ value:'TRANSFER', viewVal:'TRANSFER (TR)' },
		{ value:'SEGREGATION', viewVal:'SEGREGATION (SG)' },
		{ value:'RECLASSIFICATIO', viewVal:'RECLASSIFICATION (RC)' },
		{ value:'SPECIAL PROJECT', viewVal:'SPECIAL PROJECT (SP)' },
  ]

	//Kind Of Building Options
	kof: selectOpt[] = [
		{ value: 'Option 1', viewVal: 'Option 1'},
		{ value: 'Option 1', viewVal: 'Option 2'},
		{ value: 'Option 1', viewVal: 'Option 3'},
		{ value: 'Option 1', viewVal: 'Option 4'},
		{ value: 'Option 1', viewVal: 'Option 5'},
	]

	//Cert of Completion Options
	coc: selectOpt[] = [
		{ value: 'Option 1', viewVal: 'Option 1'},
		{ value: 'Option 1', viewVal: 'Option 2'},
		{ value: 'Option 1', viewVal: 'Option 3'},
		{ value: 'Option 1', viewVal: 'Option 4'},
		{ value: 'Option 1', viewVal: 'Option 5'},
	]

	//Structural Type Options
	st: selectOpt[] = [
		{ value: 'Option 1', viewVal: 'Option 1'},
		{ value: 'Option 1', viewVal: 'Option 2'},
		{ value: 'Option 1', viewVal: 'Option 3'},
		{ value: 'Option 1', viewVal: 'Option 4'},
		{ value: 'Option 1', viewVal: 'Option 5'},
	]

	//Cert. of Occupancy Options
	occu: selectOpt[] = [
		{ value: 'Option 1', viewVal: 'Option 1'},
		{ value: 'Option 1', viewVal: 'Option 2'},
		{ value: 'Option 1', viewVal: 'Option 3'},
		{ value: 'Option 1', viewVal: 'Option 4'},
		{ value: 'Option 1', viewVal: 'Option 5'},
	]

	//Date Constructed/Completed Options
	dcc: selectOpt[] = [
		{ value: 'Option 1', viewVal: 'Option 1'},
		{ value: 'Option 1', viewVal: 'Option 2'},
		{ value: 'Option 1', viewVal: 'Option 3'},
		{ value: 'Option 1', viewVal: 'Option 4'},
		{ value: 'Option 1', viewVal: 'Option 5'},
	]

	//Permit Issue Options
	pio: selectOpt[] = [
		{ value: 'Option 1', viewVal: 'Option 1'},
		{ value: 'Option 1', viewVal: 'Option 2'},
		{ value: 'Option 1', viewVal: 'Option 3'},
		{ value: 'Option 1', viewVal: 'Option 4'},
		{ value: 'Option 1', viewVal: 'Option 5'},
	]

	//Date Occupied Options
	dteOcc: selectOpt[] = [
		{ value: 'Option 1', viewVal: 'Option 1'},
		{ value: 'Option 1', viewVal: 'Option 2'},
		{ value: 'Option 1', viewVal: 'Option 3'},
		{ value: 'Option 1', viewVal: 'Option 4'},
		{ value: 'Option 1', viewVal: 'Option 5'},
	]

  public bldgAssessment: FormGroup;

  constructor(private router: Router) { }

	ownerHeader: string[] = ['name','address','contact','tin','actions']
	adminHeader: string[] = ['name','address','contact','tin','actions']

  ngOnInit() {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login'])
    }
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
			numSt: new FormControl('', [Validators.required]),
			bldgLoc: new FormControl('', [Validators.required]),
			prov: new FormControl('', [Validators.required]),
			brgy: new FormControl('', [Validators.required]),
			subd: new FormControl('', [Validators.required]),

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

			genDescG: new FormGroup({
				genDesc: new FormControl('', [Validators.required]),
				certcom: new FormControl('', [Validators.required]),
				certOcc: new FormControl('', [Validators.required]),
				strType: new FormControl('', [Validators.required]),
				bldgPNo: new FormControl('', [Validators.required]),
				dateCC: new FormControl('', [Validators.required]),
				permitIssue: new FormControl('', [Validators.required]),
				dateOccupied: new FormControl('', [Validators.required]),
				cct: new FormControl('', [Validators.required]),
				aob: new FormControl('', [Validators.required]),
			}),

			strDescG: new FormGroup({
				numStorey: new FormControl('', [Validators.required]),
				bldgflrs: new FormControl('', [Validators.required]),
				flrArea: new FormControl('', [Validators.required]),
			}),
		})
  }

	//addOwner() {
		//let ownerData = this.landAssessment.get('ownerDetails').value
		//ownerLs.push({
			//ownName: ownerData.ownfName + ' ' + ownerData.ownmName + ' ' + ownerData.ownlName,
			//ownAddress: ownerData.ownaddress,
			//ownContact: ownerData.owncontact,
			//ownTIN: ownerData.ownTIN
		//})
		//this.ownersLs = new MatTableDataSource(ownerLs)
		//Object.keys(this.landAssessment.controls['ownerDetails'].controls).forEach(key => {
			//this.landAssessment.controls['ownerDetails'].controls[key].reset()
		//})
	//}

}

export default BuildingAssessmentComponent
