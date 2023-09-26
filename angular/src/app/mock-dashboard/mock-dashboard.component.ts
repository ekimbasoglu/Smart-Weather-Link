import { Component, OnInit } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-mock-dashboard',
  templateUrl: './mock-dashboard.component.html',
  styleUrls: ['./mock-dashboard.component.css'],
})
export class MockDashboardComponent implements OnInit {
  isPlantsAreDry = true;
  plantStatus: string = '';
  rainStatus: string = '';

  // Data
  receivedData: any = {
    temperature: '25.6',
    humidtyIndoor: '65.00',
    humidtyPlant: 'dry',
    rainStatus: 'rain',
  };
  runServo() {
    console.log('Servo is running');
    alert('Plants are watering!');
    (this.isPlantsAreDry = false), (this.plantStatus = 'Plants are watered!');
  }

  chartData: { x: Date; y: number }[] = [];

  ngOnInit(): void {
    if (
      this.receivedData.humidtyPlant !== '' &&
      this.receivedData.humidtyPlant === 'dry'
    ) {
      this.isPlantsAreDry = true;
      this.plantStatus = 'Your plants are dry!';
    } else {
      this.plantStatus = 'Your plants are fine!';
    }

    // Check for rainStatus
    if (
      this.receivedData.rainStatus !== '' &&
      this.receivedData.rainStatus === 'rain'
    ) {
      this.rainStatus = "It's raining!";
    } else if (
      this.receivedData.rainStatus !== '' &&
      this.receivedData.rainStatus === 'no ra'
    ) {
      this.rainStatus = "It's not raining!";
    }

    // Create the chart
    this.chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light2',
      animationEnabled: true,
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
          xValueType: 'dateTime',
          xValueFormatString: 'YYYY-MM-DD HH:mm',
          yValueFormatString: '##.##°C',
          // dataPoints: this.chartData, // TODO
          dataPoints: [
            {
              x: new Date('2023-09-20 15:05'),
              y: 25.0,
            },
            {
              x: new Date('2023-09-20 15:11'),
              y: 25.6,
            },
            {
              x: new Date('2023-09-20 15:21'),
              y: 25.7,
            },
            {
              x: new Date('2023-09-20 15:31'),
              y: 25.8,
            },
            {
              x: new Date('2023-09-20 15:41'),
              y: 25.4,
            },
          ],
        },
      ],
    });

    // Render the chart
    this.chart.render();

    // // //   if (data.temperature !== '') {
    // // //     // Update the values
    // // //     this.receivedData = data;
    // // //     console.log(data);
    // // //     // Check if the plants are dry
    // // //     if (data.humidtyPlant !== '' && data.humidtyPlant === 'dry') {
    // // //       this.isPlantsAreDry = true;
    // // //       this.plantStatus = 'Your plants are dry!';
    // // //     } else {
    // // //       this.plantStatus = 'Your plants are fine!';
    // // //     }
    // // //     // Check for rainStatus
    // // //     if (data.rainStatus !== '' && data.rainStatus === 'rain') {
    // // //       this.rainStatus = "It's raining!";
    // // //     } else if (data.rainStatus !== '' && data.rainStatus === 'no ra') {
    // // //       this.rainStatus = "It's not raining!";
    // // //     }

    // // //     // create new date object with current hour and minute
    // // //     const date = new Date();
    // // //     const time = `${date.getHours()}:${date.getMinutes()}`;

    // // //     this.chartData.push({ x: new Date(time), y: data.temperature });
    // // //     // // Keep a fixed number of data points to avoid performance issues
    // // //     // if (this.chartData.length > 11) {
    // // //     //   this.chartData.shift();
    // // //     // }

    // // //     // Update the chart
    // // //     this.chart.render();
    // //   }
    // });
  }

  // Chart
  chart: any;

  chartOptions = {
    theme: 'light2',
    animationEnabled: true,
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
        xValueType: 'dateTime',
        xValueFormatString: 'YYYY-MM-DD HH:mm',
        yValueFormatString: '##.##°C',
        dataPoints: [
          // Data below is structure how its needs to be added
          {
            x: new Date('2023-09-20 15:05'),
            y: 25.0,
          },
          // {
          //   x: new Date('2023-09-20 15:10'),
          //   y: 26.2,
          // },
        ],
      },
    ],
  };
}
