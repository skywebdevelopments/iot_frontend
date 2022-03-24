import { Component, OnInit } from '@angular/core';
import { ChartType } from "angular-google-charts";
import { ChartOptions, Chart} from 'chart.js';
import { LogService } from '../../app/service/log.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myType = ChartType.PieChart;
  element:any;
  info: Array<string> = [];
  trace: Array<string> = [];
  error: Array<string> = [];
  myData = [];
  options = {
    colors: ['#0ee023', '#1221a6', '#bd1111', '#f3b49f', '#f6c7b6'],
    is3D: true
  };
  width = 1050;
  height = 600;

  constructor(private service_log: LogService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.get_log_list(true);
  } 

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);
    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }

  get_log_list(showSnackBar: boolean) {
    this.service_log.service_list_logs().then(res => {
      if (res['data']) {
        for (let i of res['data']) {
          this.element = i.log_level;
          if(this.element == 'INFO'){
            this.info.push(this.element);
          }
          else if(this.element == 'ERROR'){
            this.error.push(this.element);
          }
          else if(this.element == 'TRACE'){
            this.trace.push(this.element);
          }
        }
        // display a notification
        if (showSnackBar) {
          this.openSnackBar("Done!", "Ok", 2000);
        }
      }
      this.myData = [
        ['info', this.info.length],
        ['trace', this.trace.length],
        ['error', this.error.length],
      ];
    });
  };
  

  // private getChartData() {
  //   this.appService.getChartData().subscribe(data => {
  //     console.log(data);
  //     this.chartData = data;
  //   })
  // }

}
