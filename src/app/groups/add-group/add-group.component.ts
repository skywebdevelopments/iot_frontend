import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddGroupService } from '../../service/group/add-group.service'
import { ListSensorsComponent } from './list-sensors/list-sensors.component'

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  // form vars.
  form_AddGroup: any;
  message: String;
  authorized: boolean;
  isLinear = false;
  // end
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service_addGroup: AddGroupService
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
      this.service_addGroup.service_add_group(this.form_AddGroup.value).then(res => {
        this.openSnackBar(res['status']['message'], "Ok", 4000);
        this.form_AddGroup.reset();

      })
    }
    else {
      this.openSnackBar("invalid form values", "Ok", 4000);
    }
  }
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    // init_form on page load
    this.init_form();
  }

}
