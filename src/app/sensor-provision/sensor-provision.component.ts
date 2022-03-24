import { Component, OnInit } from '@angular/core';
import { SensorProvisioService } from '../service/sensor-provisio.service';
import { AddNodeService } from '../service/node/add-node.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sensor-provision',
  templateUrl: './sensor-provision.component.html',
  styleUrls: ['./sensor-provision.component.css']
})
export class SensorProvisionComponent implements OnInit {

  hidden= false;
  data : any;

  constructor(private provision: SensorProvisioService, private addNode: AddNodeService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    setTimeout(() => {
      const box = document.getElementById('box');
      box.style.display = 'none';
      this.hidden = true;
      this.sensor();
    }, 5000); // 👈️ time in milliseconds
  }

  sensor(){
    this.provision.service_list_sensors_status().then(res => {
      console.log(res);
      this.data = res;
    })
  }

  trust(){
    this.addNode.service_add_node(this.data).then(res => {
      this.openSnackBar(res['status']['message'], "Ok", 4000);
    })
  }

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open("added to white list", action);
  }


}
