import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Writer } from 'protobufjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  private readonly options: any = {
    responseType: 'arraybuffer',
    headers: new HttpHeaders({
      'Content-Type': 'application/x-protobuf',
      'Accept': 'application/x-protobuf'
    })
  };

  get(url: string, timeout = 5000): Promise<Uint8Array> {
    return this.http.get(url, this.options)
      .timeout(timeout)
      .map(data => new Uint8Array(data))
      .toPromise();
  }

  post(url: string, value: Writer, timeout = 5000): Promise<Uint8Array> {
    const array = value.finish();
    const length = array.byteLength;
    const offcet = array.byteOffset;
    const body = array.buffer.slice(offcet, offcet + length);
    return this.http.post(url, body, this.options)
      .timeout(timeout)
      .map(data => new Uint8Array(data))
      .toPromise();
  }
}
