import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddGroupService } from '../../service/group/add-group.service'
import { ListGroupService } from '../../service/group/list-group.service';
import { ListSensorsComponent } from './list-sensors/list-sensors.component';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  @ViewChild(ListSensorsComponent) child;
  @ViewChild('stepper') private myStepper: MatStepper;
  form_AddGroup: FormGroup;
  id: any;
  // form vars.
  message: String;
  authorized: boolean;
  isLinear = true;
  // end
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service_listGroup: ListGroupService,
    private service_addGroup: AddGroupService,

  ) { }

  init_form() {
    // validators 
    // name min length 
    // required.
    this.form_AddGroup = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      active: [
        false,
      ]
    })
  }

  save_group() {
    // check the form is valid 
    if (this.form_AddGroup.valid) {
      // submit the form
      this.form_AddGroup.get('name').value;
      this.service_addGroup.service_add_group(this.form_AddGroup.value).then(res => {
     if(res['code']===3100){
      this.openSnackBar("Group Name is already exist", "Ok", 2000);
     }
     else{
        this.id = res['data']['rec_id'];
        this.openSnackBar(res['message'], "Ok", 1000);
        this.myStepper.next();
        this.form_AddGroup.reset();
     }
      })
    }
    else {
      this.openSnackBar("invalid form values", "Ok", 2000);
    }
  }
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);
  }

  get_sensors() {
    this.child.get_sensor_list(true);
  }
  ngAfterViewInit() {
    this.child.assign_sensors();
    this.myStepper.next();
  }


  ngOnInit(): void {
    // init_form on page load
    this.init_form();
  }

}
