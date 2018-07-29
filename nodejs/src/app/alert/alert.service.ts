import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from './alert';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultTimeout: number = 5000;

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, timeout: number = this.defaultTimeout) {
    this.alert(AlertType.SUCCESS, message, timeout);
  }

  error(message: string, timeout: number = this.defaultTimeout) {
    this.alert(AlertType.ERROR, message, timeout);
  }

  info(message: string, timeout: number = this.defaultTimeout) {
    this.alert(AlertType.INFO, message, timeout);
  }

  warn(message: string, timeout: number = this.defaultTimeout) {
    this.alert(AlertType.WARNING, message, timeout);
  }

  alert(type: AlertType, message: string, timeout: number) {
    this.subject.next(<Alert>{ type: type, message: message, timeout: timeout });
  }

  clear() {
    this.subject.next();
  }
}
