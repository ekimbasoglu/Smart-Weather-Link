import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../services/socketService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // example for only one socket
  receivedData: string = '';

  //
  // Data
  temperature: string = '';
  humidtyIndoor: string = '';
  humidtyPlant: string = '';
  allData: any[] = [];

  constructor(private socket: Socket, private socketService: SocketService) {}

  ngOnInit(): void {
    // this.socketService.data$.subscribe((data) => {
    //   this.receivedData = data;
    // });
    this.socketService.getData();
  }

  chart: any;

  chartOptions = {
    theme: 'light2',
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: 'Temperature indoors:',
    },
    axisY: {
      labelFormatter: (e: any) => {
        var suffixes = ['', '', 'M', 'B', 'T'];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(10)), 0);
        if (order > suffixes.length - 1) order = suffixes.length - 1;

        var suffix = suffixes[order];
        return e.value / Math.pow(1, order) + suffix + '°C';
      },
    },
    data: [
      {
        type: 'line',
        xValueFormatString: 'HHMMSS',
        yValueFormatString: '##.##°C',
        dataPoints: [{ x: '14:22:10', y: 23.41 }], // X generate time, y data temperature indoors
      },
    ],
  };
}
