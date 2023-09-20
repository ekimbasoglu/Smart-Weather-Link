import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  // Generate Data model

  currentData = this.socket.fromEvent<Data>('data');
  allData = this.socket.fromEvent<Data[]>('allData');
  // private data: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // public data$ = this.data.asObservable();
  // data = {
  //   temperature: '',
  //   humidtyIndoor: '',
  //   humidtyPlant: '',
  //   allData: [],
  //   timestamp: new Date().getTime(),
  // };

  constructor(private router: Router, private socket: Socket) {
    this.getData();
  }

  getData(): void {
    this.socket.on('temperature', (data: any) => {
      this.currentData = data;  
    });
    // this.socket.on('humidtyIndoor', (data: any) => {
    //   this.data.humidtyIndoor = data;
    // });
    // this.socket.on('humidtyPlant', (data: any) => {
    //   this.data.humidtyPlant = data;
    // });
    // this.socket.on('allData', (data: any) => {
    //   this.data.allData = data;
    // });
    // return this.data;
  }
}
