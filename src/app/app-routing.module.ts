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
import { SignupComponent } from './signup/signup.component';
import { IndexComponent } from './index/index.component';
import { RolesComponent } from './roles/roles.component';


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

    ], outlet: "first"
  }
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
