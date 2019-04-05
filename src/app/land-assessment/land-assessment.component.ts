import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface trns {
	value: string;
	viewVal: string;
}

@Component({
  selector: 'app-land-assessment',
  templateUrl: './land-assessment.component.html',
  styleUrls: ['./land-assessment.component.sass']
})
export class LandAssessmentComponent implements OnInit {

	trnsLs: trns[] = [
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

	public landAssessment: FormGroup;
	public pin: FormGroup;

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
				fName: new FormControl('',[Validators.required]),
				mName: new FormControl('',[Validators.required]),
				lName: new FormControl('',[Validators.required]),
				address: new FormControl('',[Validators.required]),
				contact: new FormControl('',[Validators.required]),
				TIN: new FormControl('',[Validators.required]),
			})
		})
	}

}

export default LandAssessmentComponent
