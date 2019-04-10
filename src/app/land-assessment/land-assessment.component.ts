import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

export interface selectOpt {
	value: string;
	viewVal: string;
}

export interface landOwner {
	ownName: string;
	ownAddress: string;
	ownContact: string;
	ownTIN: string;
}

export interface adminOwner {
	admName: string;
	admAddress: string;
	admContact: string;
	admTIN: string;
}

var ownerLs: landOwner[] = []
var adminLs: adminOwner[] = []

@Component({
  selector: 'app-land-assessment',
  templateUrl: './land-assessment.component.html',
  styleUrls: ['./land-assessment.component.sass']
})
export class LandAssessmentComponent implements OnInit {

	ownersLs = new MatTableDataSource(ownerLs)
	adminsLs = new MatTableDataSource(adminLs)

	ownerHeader: string[] = ['name','address','contact','tin','actions']
	adminHeader: string[] = ['name','address','contact','tin','actions']

	trnsLs: selectOpt[] = [
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

	landClassLs: selectOpt[] = [
		{ value: 'COMMERCIAL', viewVal: 'COMMERCIAL' },
		{ value: 'INDUSTRIAL', viewVal: 'INDUSTRIAL' },
		{ value: 'RESIDENTIAL', viewVal: 'RESIDENTIAL' },
		{ value: 'AGRICULTURAL', viewVal: 'AGRICULTURAL' }
	]

	subClassLs: selectOpt[] = [
		{ value: 'C-1', viewVal: 'C-1' },
		{ value: 'C-2', viewVal: 'C-2' },
		{ value: 'C-3', viewVal: 'C-3' },
		{ value: 'C-4', viewVal: 'C-4' }
	]

	public landAssessment: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login'])
    }
		this.initializeForm();
  }

	save(form: object){
		if(this.landAssessment.valid){
			console.log(form)
		}
	}



	addOwner() {
		let ownerData = this.landAssessment.get('ownerDetails').value
		ownerLs.push({
			ownName: ownerData.ownfName + ' ' + ownerData.ownmName + ' ' + ownerData.ownlName,
			ownAddress: ownerData.ownaddress,
			ownContact: ownerData.owncontact,
			ownTIN: ownerData.ownTIN
		})
		this.ownersLs = new MatTableDataSource(ownerLs)
		Object.keys(this.landAssessment.controls['ownerDetails'].controls).forEach(key => {
			this.landAssessment.controls['ownerDetails'].controls[key].reset()
		})
	}

	addAdmin() {
		let adminData = this.landAssessment.get('adminOwnerLs').value
		adminLs.push({
			admName: adminData.admfName + ' ' + adminData.admmName + ' ' + adminData.admlName,
			admAddress: adminData.admaddress,
			admContact: adminData.admcontact,
			admTIN: adminData.admTIN
		})
		this.adminsLs = new MatTableDataSource(adminLs)
		Object.keys(this.landAssessment.controls['adminOwnerLs'].controls).forEach(key => {
			this.landAssessment.controls['adminOwnerLs'].controls[key].reset()
		})
	}

	removeOwnerDetail(evt){
		_.remove(ownerLs, evt)
		this.ownersLs = new MatTableDataSource(ownerLs)
	}

	removeAdminDetail(evt) {
		_.remove(adminLs, evt)
		this.adminsLs = new MatTableDataSource(adminLs)
	}

	initializeForm(){
		this.landAssessment = new FormGroup({
			trnsCode: new FormControl('', [Validators.required]),
			arpNo: new FormControl('', [Validators.required]),
			pin: new FormGroup({
				city: new FormControl('',[Validators.required]),
				district: new FormControl('',[Validators.required]),
				barangay: new FormControl('',[Validators.required]),
				section: new FormControl('',[Validators.required]),
				parcel: new FormControl('',[Validators.required])
			}),
			OCT_TCT: new FormControl('',[Validators.required]),
			surveyNo: new FormControl('',[Validators.required]),
			lotNo: new FormControl('',[Validators.required]),
			blockNo: new FormControl('',[Validators.required]),
			propertyLocation: new FormGroup({
				streetNo: new FormControl('',[Validators.required]),
				barangay: new FormControl('',[Validators.required]),
				subdivision: new FormControl('',[Validators.required]),
				city: new FormControl('',[Validators.required]),
				province: new FormControl('',[Validators.required]),
				north: new FormControl('',[Validators.required]),
				south: new FormControl('',[Validators.required]),
				east: new FormControl('',[Validators.required]),
				west: new FormControl('',[Validators.required])
			}),
			ownerDetails: new FormGroup({
				ownfName: new FormControl(''),
				ownmName: new FormControl(''),
				ownlName: new FormControl(''),
				ownaddress: new FormControl(''),
				owncontact: new FormControl(''),
				ownTIN: new FormControl(''),
			}),
			adminOwnerLs: new FormGroup({
				admfName: new FormControl(''),
				admmName: new FormControl(''),
				admlName: new FormControl(''),
				admaddress: new FormControl(''),
				admcontact: new FormControl(''),
				admTIN: new FormControl(''),
			}),
			landAppraisal: new FormGroup({
				class: new FormControl(''),
				subclass: new FormControl(''),
				area: new FormControl(''),
				unitVal: new FormControl(''),
				baseMarketVal: new FormControl(''),
				interiorLot: new FormControl(''),
				cornerLot: new FormControl(''),
				stripping: new FormControl('')
			}),
			stripSet: new FormGroup({
				stripCount: new FormControl(''),
				stripArea: new FormControl(''),
				adjustment: new FormControl(''),
				adjustedBasicRate: new FormControl(''),
				stripMarketVal: new FormControl('')
			}),
			otherImprovements: new FormGroup({
				kind: new FormControl(''),
				totalNo: new FormControl(''),
				unitVal: new FormControl(''),
				basicMarketVal: new FormControl('')
			}),
			marketVal: new FormGroup({
				baseMarketVal: new FormControl(''),
				adjustmentFactor: new FormControl(''),
				adjustmentPercent: new FormControl(''),
				adjustmentVal: new FormControl(''),
				marketVal: new FormControl('')
			}),
			propertyAssessment: new FormGroup({
				actualUse: new FormControl(''),
				marketVal: new FormControl(''),
				assessmentLvl: new FormControl(''),
				assessedVal: new FormControl(''),
				specialClass: new FormControl(''),
				status: new FormControl(''),
				efftQ: new FormControl(''),
				effty: new FormControl(''),
				total: new FormControl(''),
				appraisedName: new FormControl(''),
				appraisedDate: new FormControl(''),
				recommendName: new FormControl(''),
				recommendDate: new FormControl(''),
				approvedName: new FormControl(''),
				approvedDate: new FormControl(''),
				memoranda: new FormControl('')
			}),
			supersededRec: new FormGroup({
				supPin: new FormControl(''),
				supArpNo: new FormControl(''),
				supTDNo: new FormControl(''),
				supTotalAssessedVal: new FormControl(''),
				supPrevOwner: new FormControl(''),
				supEff: new FormControl(''),
				supARPageNo: new FormControl(''),
				supRecPersonnel: new FormControl(''),
				supDate: new FormControl(''),
			}),
			status: new FormControl(''),
			dateCreated: new FormControl(''),
			encoder: new FormControl(''),
			attachment: new FormControl(''),
		})
	}

}

export default LandAssessmentComponent
