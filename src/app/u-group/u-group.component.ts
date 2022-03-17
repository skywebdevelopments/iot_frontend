import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-u-group',
  templateUrl: './u-group.component.html',
  styleUrls: ['./u-group.component.css']
})
export class UGroupComponent implements OnInit {

  groupname = new FormControl('', [Validators.required]);
  activeGroup = new FormControl(false);
  panelOpenState = false;

  getErrorMessage() {
    if (this.groupname.hasError('required')) {
      return 'You must enter a name';
    }
  }

  avaliableRoles = ["ugroup:create", "ugroup:update", "user:list", "user:update", "sensor:list", "sensor:create", "sensor:delete", "sensor:update", "sensor", "s_group:list", "s_group:create", "s_group:delete", "s_group:update", "s_group", "mqttuser:list", "mqttuser:create", "mqttuser:delete", "mqttuser:update","sensortype:list","sensortype:delete","sensortype:update","sensortype:create"];

  assignedRoles = [];

  data = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.avaliableRoles, event.previousIndex, event.currentIndex);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      //console.log(event.container.data);
      this.data.push(event.container.data);
    }
  }

  saveResults(){
    console.log(this.data);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
