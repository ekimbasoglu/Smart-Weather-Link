import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    temperature: '',
    humidtyIndoor: '',
    humidtyPlant: '',
    rainStatus: '',
    // allData: [],
  });
  public data$ = this.dataSubject.asObservable();

  constructor(private router: Router, public socket: Socket) {
    this.getData();
  }
  getData(): void {
    this.socket.on('data', (data: any) => {
      this.dataSubject.next({
        ...this.dataSubject.value, // Preserve the current values of other properties
        ...data, // Update only the 'temperature' property
      });
    });
  }
}
