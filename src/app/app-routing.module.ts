import { SensorProvisionComponent } from './sensor-provision/sensor-provision.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
import { AddSensorComponent } from './sensors/add-sensor/add-sensor/add-sensor.component';
import { ListSensorComponent } from './sensors/list-sensor/list-sensor/list-sensor.component';
import { LoginComponent } from './login/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SignupComponent } from './signup/signup.component';
import { IndexComponent } from './index/index.component';
import { LogsComponent } from './logs/logs.component';
import { GroupSensorComponent } from './group-sensor/group-sensor.component';
import { GroupSensorTreeComponent } from './group-sensor-tree/group-sensor-tree.component';
import { ListSensorTypeComponent } from './sensor-type/list-sensor-type/list-sensor-type.component';
import { MqttUserComponent } from './mqtt-user/mqtt-user.component';
import { SideNavBarComponent } from './shared/side-nav-bar/side-nav-bar.component';
import { UsersComponent } from './users/user-management/users.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AddUgroupsComponent } from './user-groups/add-ugroups/add-ugroups.component';
import { ListUgroupsComponent } from './user-groups/list-ugroups/list-ugroups.component';

import { TestcomComponent } from './testcom/testcom.component';


const routes: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "logs", component: LogsComponent },
  { path: "addGroup", component: AddGroupComponent },
  { path: "listGroup", component: ListGroupComponent },
  { path: "addGroup", component: AddGroupComponent },
  { path: "addSensor", component: AddSensorComponent },
  { path: "listSensor", component: ListSensorComponent },
  { path: "sensor-group", component: GroupSensorComponent },
  { path: "sensor-group-tree", component: GroupSensorTreeComponent },
  { path: "listsensortype", component: ListSensorTypeComponent },
  { path: "listmqttuser", component: MqttUserComponent },
  { path: "usersManagement", component: UsersComponent },
  { path: "userProfile", component: UserProfileComponent },
  { path: "addUgroup", component: AddUgroupsComponent },
  { path: "listUgroup", component: ListUgroupsComponent },
  { path: "test123", component: TestcomComponent },
  { path: "sensor-group-tree", component: GroupSensorTreeComponent },
  {path: "provision", component: SensorProvisionComponent}
]
// const routes: Routes = [
//   { path: "Login", component: LoginComponent, outlet: "first" },
//   { path: "", component: LoginComponent, outlet: "first" },
//   { path: "signup", component: SignupComponent, outlet: "first" },
//   {
//     path: "index", component: IndexComponent, children: [
//       { path: "rolesUser", component: RolesComponent, outlet: "second" },
//       { path: "addGroup", component: AddGroupComponent, outlet: "second" },
//       { path: "listGroup", component: ListGroupComponent, outlet: "second" },
//       { path: "addGroup", component: AddGroupComponent, outlet: "second" },
//       { path: "test", component: TestComponentComponent, outlet: "second" },
//       { path: "addSensor", component: AddSensorComponent, outlet: "second" },
//       { path: "listSensor", component: ListSensorComponent, outlet: "second" },
//       { path: "nav", component: SidenavComponent, outlet: "second" },
//       { path: "logs", component: LogsComponent, outlet: "second" },
//       { path: "sensor-group", component: GroupSensorComponent, outlet: "second" },
//       { path: "sensor-group-tree", component: GroupSensorTreeComponent, outlet: "second" },
//       { path: "sidenav", component: SidenavComponent, outlet: "second" },
    
//       { path: "List-sensor-type", component: ListSensorTypeComponent, outlet: "second" }

//     ], outlet: "first"
//   }
// ]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
