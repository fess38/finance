export interface Alert {
  message: string;
  timeout: number;
  type: AlertType;
}

export enum AlertType {
  SUCCESS,
  ERROR,
  INFO,
  WARNING
}
