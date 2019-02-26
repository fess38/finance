import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from './alert';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultTimeout: number = 5000;

  constructor(private translate: TranslateService) {}

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
    this.translate.get(message).subscribe(x => {
      this.subject.next(<Alert>{ type: type, message: x, timeout: timeout });
    });
  }

  clear() {
    this.subject.next();
  }
}
