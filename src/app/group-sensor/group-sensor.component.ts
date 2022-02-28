import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupSensorService } from '../service/group-sensor/group-sensor.service';

@Component({
  selector: 'app-group-sensor',
  templateUrl: './group-sensor.component.html',
  styleUrls: ['./group-sensor.component.css']
})
export class GroupSensorComponent implements OnInit {

  group: any
 
  constructor(
    private service_listGroup_sensor: GroupSensorService
  ) {
  }


  get_Sensor_group_list() {
    this.service_listGroup_sensor.service_list_group_sensor().then(res => {
      if (res['data']) {
        this.group = res['data']
      }
    });
  };
  
  ngOnInit(): void {
    this.get_Sensor_group_list()
   


  }


}
