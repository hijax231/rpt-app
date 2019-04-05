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
			surveyNo: new FormControl('',[Validators.required])
		})
	}

}

export default LandAssessmentComponent
