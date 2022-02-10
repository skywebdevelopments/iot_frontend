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
