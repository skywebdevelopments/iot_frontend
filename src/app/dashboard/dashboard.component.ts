import { Component, OnInit } from '@angular/core';
import { ChartType } from "angular-google-charts";
import { ChartOptions, Chart } from 'chart.js';
import { LogService } from '../../app/service/log.service';
import { ListEntityService } from '../../app/service/entity/list-entity.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myType = ChartType.PieChart;

  //logs
  element: any;
  info: Array<string> = [];
  trace: Array<string> = [];
  error: Array<string> = [];
  myData = [];

  //entity
  entity: any;
  Light: Array<string> = [];
  Temperature: Array<string> = [];
  Humidity: Array<string> = [];
  myentity = [];

  options = {
    colors: ['#0ee023', '#1221a6', '#bd1111', '#f3b49f', '#f6c7b6'],
    is3D: true
  };
  width = 1050;
  height = 600;

  constructor(private service_log: LogService,
    private _snackBar: MatSnackBar,
    private service_listentity: ListEntityService,
  ) { }

  ngOnInit(): void {
    this.get_log_list(true);
    this.get_entity_list(true);
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
          if (this.element == 'INFO') {
            this.info.push(this.element);
          }
          else if (this.element == 'ERROR') {
            this.error.push(this.element);
          }
          else if (this.element == 'TRACE') {
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


  get_entity_list(showSnackBar: boolean) {
    this.service_listentity.service_list_entity().then(res => {
      if (res['data']) {
        for (let i of res['data']) {
          this.entity = i.type;
          if (this.entity == 'Light') {
            this.Light.push(this.entity);
          }
          else if (this.entity == 'Temperature') {
            this.Temperature.push(this.entity);
          }
          else if (this.entity == 'Humidity') {
            this.Humidity.push(this.entity);
          }
        }
        // display a notification
        if (showSnackBar) {
          this.openSnackBar("Done!", "Ok", 2000);
        }
      }
      this.myentity = [
        ['Light', this.Light.length],
        ['Temperature', this.Temperature.length],
        ['Humidity', this.Humidity.length],
      ];
    });
  };

}
