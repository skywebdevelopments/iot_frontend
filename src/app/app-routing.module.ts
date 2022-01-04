import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
import { UpdateGroupComponent } from './groups/update-group/update-group.component';

const routes: Routes = [
  { path: "addGroup", component: AddGroupComponent },
  { path: "listGroup", component: ListGroupComponent },
  { path: "updateGroup", component: UpdateGroupComponent}
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
