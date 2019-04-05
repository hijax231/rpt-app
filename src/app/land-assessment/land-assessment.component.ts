import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Transaction {
  value: string;
  viewVal: string;
}

@Component({
  selector: 'app-land-assessment',
  templateUrl: './land-assessment.component.html',
  styleUrls: ['./land-assessment.component.sass']
})
export class LandAssessmentComponent implements OnInit {

  public landFaas: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login'])
    }
    this.loginForm = new FormGroup({
      
    })
  }

}

export default LandAssessmentComponent
