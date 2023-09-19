import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    // TODO
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
        var suffixes = ['', 'K', 'M', 'B', 'T'];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1) order = suffixes.length - 1;

        var suffix = suffixes[order];
        return '$' + e.value / Math.pow(1000, order) + suffix;
      },
    },
    data: [
      {
        type: 'line',
        xValueFormatString: 'YYYY',
        yValueFormatString: '$#,###.##',
        dataPoints: [{ x: 1, y: 2 }], // X generate time, y data temperature indoors
      },
    ],
  };
}
