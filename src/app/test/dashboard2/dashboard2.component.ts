import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartType } from "angular-google-charts";
import { ChartOptions, Chart } from 'chart.js';
import { LogService } from '../../../app/service/log.service';
import { ListEntityService } from '../../../app/service/entity/list-entity.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component {

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
  width = 500;
  height = 200;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Log Chart', cols: 1, rows: 1 },
          { title: 'Node Types Chart', cols: 1, rows: 1 }
        ];
      }

      return [
      
        { title: 'Log Chart', cols: 1, rows: 1 },
        { title: 'Node Types Chart', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service_log: LogService,
    private service_listentity: ListEntityService,) {}

    get_log_list() {
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
        }
        this.myData = [
          ['info', this.info.length],
          ['trace', this.trace.length],
          ['error', this.error.length],
        ];
      });
    };
  
    ngOnInit(): void {
      this.get_log_list();
      this.get_entity_list();
    }
  
    get_entity_list() {
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
  
        }
        this.myentity = [
          ['Light', this.Light.length],
          ['Temperature', this.Temperature.length],
          ['Humidity', this.Humidity.length],
        ];
      });
    };
}
