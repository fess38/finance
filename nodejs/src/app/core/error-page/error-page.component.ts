import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'error-page.component.html'
})
export class ErrorPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.router.navigate(['/']), 30000);
  }
}
