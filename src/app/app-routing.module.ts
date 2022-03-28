import { SensorProvisionComponent } from './sensor-provision/sensor-provision.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
import { AddNodeComponent } from './node/add-node/add-node.component';
import { ListNodeComponent } from './node/list-node/list-node.component';
import { LoginComponent } from './login/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SignupComponent } from './signup/signup.component';
import { IndexComponent } from './index/index.component';
import { LogsComponent } from './logs/logs.component';
import { ListEntityComponent } from './entity/list-entity/list-entity.component';
import { MqttUserComponent } from './mqtt-user/mqtt-user.component';
import { SideNavBarComponent } from './shared/side-nav-bar/side-nav-bar.component';
import { UsersComponent } from './users/user-management/users.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AddUgroupsComponent } from './user-groups/add-ugroups/add-ugroups.component';
import { ListUgroupsComponent } from './user-groups/list-ugroups/list-ugroups.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

import { TestcomComponent } from './testcom/testcom.component';

import { Dashboard2Component } from './test/dashboard2/dashboard2.component';


const routes: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "logs", component: LogsComponent },
  { path: "addGroup", component: AddGroupComponent },
  { path: "listGroup", component: ListGroupComponent },
  { path: "addGroup", component: AddGroupComponent },
  { path: "addNode", component: AddNodeComponent},
  { path: "listNode", component: ListNodeComponent },
  { path: "listentity", component: ListEntityComponent },
  { path: "listmqttuser", component: MqttUserComponent },
  { path: "usersManagement", component: UsersComponent },
  { path: "userProfile", component: UserProfileComponent },
  { path: "addUgroup", component: AddUgroupsComponent },
  { path: "listUgroup", component: ListUgroupsComponent },
  { path: "test123", component: TestcomComponent },
  {path: "provision", component: SensorProvisionComponent},
  {path: "dash", component: Dashboard2Component}
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
