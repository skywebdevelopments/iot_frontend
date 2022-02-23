import { Component, OnInit, ViewChild } from '@angular/core';
import { ListGroupService } from '../service/group/list-group.service';
import { GroupSensorService } from '../service/group-sensor/group-sensor.service';
import { ListMqqtUserService } from '../service/user/list-mqqt-user.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AuthorizeRoleService } from '../../app/service/user/authorize-role.service';

export interface sensor_groupElement {
  mac_address: "text",
  client_id: "text",
  active: "boolean",
  sensor_type: "text",
  static_ip: "text",
  dns1: "text",
  dns2: "text",
  gateway: "text",
  subnet: "text",
  serial_number: "text",
  sleep_time: "number",
  ap_name: "text",
  ap_ip: "text",
  node_profile: "number",
  host_ip: "text",
  board_name: "text",
  board_model: "text",
  sim_serial: "text",
  sim_msidm: "text",
  flags: "text",
  mqttUserId: "number",
  rec_id: "text"
}
const ELEMENT_DATA: sensor_groupElement[] = [];

@Component({
  selector: 'app-group-sensor',
  templateUrl: './group-sensor.component.html',
  styleUrls: ['./group-sensor.component.css']
})
export class GroupSensorComponent implements OnInit {

  authorized: boolean;
  group: any
  mqtt: any;

  displayedColumns: string[] =
    [
      'mac_address',
      'client_id',
      'active',
      'sensor_type',
      'static_ip',
      'dns1',
      'dns2',
      'gateway',
      'subnet',
      'serial_number',
      'sleep_time',
      'ap_name',
      'ap_ip',
      'node_profile',
      'host_ip',
      'board_name',
      'board_model',
      'sim_serial',
      'sim_msidm',
      'flags',
      'mqtt_user'];

  dataSource = new MatTableDataSource<sensor_groupElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service_listGroup: ListGroupService,
    private service_listGroup_sensor: GroupSensorService,
    private service_authorize: AuthorizeRoleService,
    private service_ListMqtt_User: ListMqqtUserService
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  get_Sensor_group_list() {
    this.service_listGroup_sensor.service_list_group_sensor().then(res => {
      if (res['data']) {
        this.group = res['data']
      }
    });
  };

  Get_mqqtuser() {
    var mqtt_User = []
    this.service_ListMqtt_User.service_list_mqttUser().then(res => {
      res['data'].forEach(function (mqtt_user) {
        mqtt_User.push(mqtt_user)
      });
    });
    return mqtt_User;
  }
  
  ngOnInit(): void {
    this.get_Sensor_group_list()
    //  this.mqtt = this.Get_mqqtuser();


  }


}
