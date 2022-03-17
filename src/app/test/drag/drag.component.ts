import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css'],
})
export class DragComponent {
  todo = [

  ];

  done = [
    "admin",
    "sensor:list",
    "sensor:create",
    "sensor:delete",
    "sensor:update",
    "sensor",
    "s_group:list",
    "s_group:create",
    "s_group:delete",
    "s_group:update",
    "s_group",
    "mqttuser:list",
    "mqttuser:create",
    "mqttuser:delete",
    "mqttuser:update",
    "sensortype:list",
    "sensortype:create",
    "sensortype:update",
    "sensortype:delete"
  ]

  drop(event: CdkDragDrop<string[]>) {


    transferArrayItem(["shalaby:test:data"],
      event.container.data,
      event.previousIndex,
      event.currentIndex

    );

    if (event.previousContainer === event.container) {


      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex

      );

    }



  }



}
