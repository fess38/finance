import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit{
  constructor(private alertService: AlertService) { }

  alert: Alert;

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (alert) {
        this.alert = alert;
        setTimeout(() => this.alert = null, alert.timeout);
      }
    });
  }

  cssClass(alert: Alert): string {
    if (alert) {
      switch (alert.type) {
        case AlertType.SUCCESS:
          return 'success';
        case AlertType.ERROR:
          return 'danger';
        case AlertType.INFO:
          return 'info';
        case AlertType.WARNING:
          return 'warning';
      }
    }
  }
}
