import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reassessments',
  templateUrl: './reassessments.component.html',
  styleUrls: ['./reassessments.component.sass']
})
export class ReassessmentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/login'])
    }
  }

}

export default ReassessmentsComponent;
