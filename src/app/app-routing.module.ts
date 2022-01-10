import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { ListSensorComponent } from './sensors/list-sensor/list-sensor/list-sensor.component';


const routes: Routes = [
  { path: "addGroup", component: AddGroupComponent },
  { path: "listGroup", component: ListGroupComponent },
  { path: "addGroup", component: AddGroupComponent },
  { path: "test", component: TestComponentComponent },
  { path: "listSensor", component: ListSensorComponent }
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
