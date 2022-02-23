import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { AddSensorComponent } from './sensors/add-sensor/add-sensor/add-sensor.component';
import { ListSensorComponent } from './sensors/list-sensor/list-sensor/list-sensor.component';
import { LoginComponent } from './login/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: "login",  component: LoginComponent },
  { path: "", component: LoginComponent },
  { path: "addGroup", component: AddGroupComponent },
  { path: "listGroup",  component: ListGroupComponent },
  { path: "addGroup",  component: AddGroupComponent },
  { path: "test",  component: TestComponentComponent },
  { path: "addSensor",  component: AddSensorComponent },
  { path: "listSensor", component: ListSensorComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "nav",  component: SidenavComponent },
=======
import { SignupComponent } from './signup/signup.component';
import { IndexComponent } from './index/index.component';
import { RolesComponent } from './roles/roles.component';
import { LogsComponent } from './logs/logs.component';
import { GroupSensorComponent } from './group-sensor/group-sensor.component';


const routes: Routes = [
  { path: "Login", component: LoginComponent, outlet: "first" },
  { path: "", component: LoginComponent, outlet: "first" },
  { path: "signup", component: SignupComponent, outlet: "first" },
  {
    path: "index", component: IndexComponent, children: [
      { path: "rolesUser", component: RolesComponent, outlet: "second" },
      { path: "addGroup", component: AddGroupComponent, outlet: "second" },
      { path: "listGroup", component: ListGroupComponent, outlet: "second" },
      { path: "addGroup", component: AddGroupComponent, outlet: "second" },
      { path: "test", component: TestComponentComponent, outlet: "second" },
      { path: "addSensor", component: AddSensorComponent, outlet: "second" },
      { path: "listSensor", component: ListSensorComponent, outlet: "second" },
      { path: "nav", component: SidenavComponent, outlet: "second" },
      { path: "logs", component: LogsComponent, outlet: "second" },
      { path: "sensor-group", component: GroupSensorComponent, outlet: "second" }

    ], outlet: "first"
  }
>>>>>>> d0dbf1d3c83555d3b78acf362cfdcb5c39a3511b
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
