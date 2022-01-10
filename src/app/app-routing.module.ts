import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
import { TestComponentComponent } from './test-component/test-component.component';
<<<<<<< HEAD
import { AddSensorComponent } from './sensors/add-sensor/add-sensor/add-sensor.component';
//
=======
import { ListSensorComponent } from './sensors/list-sensor/list-sensor/list-sensor.component';

>>>>>>> 0eefe7608af37e5690c0ea716c243b98355bcb6b

const routes: Routes = [
  { path: "addGroup", component: AddGroupComponent },
  { path: "listGroup", component: ListGroupComponent },
  { path: "addGroup", component: AddGroupComponent },
  { path: "test", component: TestComponentComponent },
<<<<<<< HEAD
  { path: "addSensor", component: AddSensorComponent }
=======
  { path: "listSensor", component: ListSensorComponent }
>>>>>>> 0eefe7608af37e5690c0ea716c243b98355bcb6b
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