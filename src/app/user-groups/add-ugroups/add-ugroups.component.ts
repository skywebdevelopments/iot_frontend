import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListRolesService } from '../../service/user/list-roles.service';
import { AddUgroupService } from '../../service/user/add-ugroup.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-ugroups',
  templateUrl: './add-ugroups.component.html',
  styleUrls: ['./add-ugroups.component.css']
})
export class AddUgroupsComponent implements OnInit {
  groupname = new FormControl('', [Validators.required, Validators.minLength(4)]);
  role = new FormControl('', [Validators.required,Validators.minLength(4)]);
  active = new FormControl(false);
  panelOpenState = false;
  avaliableRoles=[];
  assignedRoles = [];
  data = [];

  constructor(
    private service_List_Roles: ListRolesService,
    private service_Add_ugroup: AddUgroupService,
    private _snackBar: MatSnackBar) { }


  // get roles 
  get_roles() {
    this.service_List_Roles.service_list_usergroups().then(res => {
      if (res['data']) {
        for (var item of res['data'])
        this.avaliableRoles.push(item['role'])
      }
      else {
        this.avaliableRoles = [];
        this.openSnackBar("list is Empty!", "Ok", 2000);

      }
    });
  };

  //snackbar
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }

  getErrorMessageGroup() {
    if (this.groupname.hasError('required')) {
      return 'You must enter a groupname';
    }
    if (this.groupname.hasError('minlength')) {
      return 'Groupname must be at least 4 characters long.';
    }
  }
  getErrorMessageRole() {
    if (this.role.hasError('required')) {
      return 'You must enter a rolename';
    }
    if (this.role.hasError('minlength')) {
      return 'Rolename must be at least 4 characters long.';
    }
  }

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
      this.data.push(event.container.data);
    }
  }

  saveResults() {
    const new_group ={"groupname":this.groupname.value, "roles":this.assignedRoles, "active":this.active.value};
    this.service_Add_ugroup.service_add_group(new_group).then(res => {
      if(res['code']===3100){
        this.openSnackBar("User Group is already exist", "Ok", 2000);
       }
       else{
          this.openSnackBar("User group is added sucessfully", "Ok", 1000);
          location.reload();
       }
    })
  }

  saveRole() {
    this.service_Add_ugroup.service_add_role({"role":this.role.value}).then(res => {
      if(res['code']===3100){
        this.openSnackBar("Group Role is already exist", "Ok", 2000);
       }
       else{
          this.openSnackBar("Group Role is added sucessfully", "Ok", 1000);
          location.reload();
       }
    })
  }

  ngOnInit(): void {
    this.get_roles();
  }

}
