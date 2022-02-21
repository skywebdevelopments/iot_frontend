import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LogService } from '../../app/service/log.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatSort, MatSortable } from '@angular/material/sort';
import { AuthorizeRoleService } from '../../app/service/user/authorize-role.service';



export interface logElement {
  operation: "text",
  log_Message: "text",
  log_Level: "text",
  user_id:"integer",
  createdAt:"text",
  updatedAt:"text"
}

// to be filled from the service
const ELEMENT_DATA: logElement[] = [];

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
   // form controls.
   authorized: boolean;
   // end
 
 
   displayedColumns: string[] = ['operation', 'log_message', 'log_level', 'user_id','createdAt','updatedAt'];
   dataSource = new MatTableDataSource<logElement>(ELEMENT_DATA);
   
 
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
 

   ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  } 

  constructor(
    private service_log: LogService,
    private _snackBar: MatSnackBar,
    private service_authorize: AuthorizeRoleService,
  ) { }


  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }


  get_log_list(showSnackBar: boolean) {

    this.service_log.service_list_logs().then(res => {
      if (res['data']) {
        // add data to the table (data source)
        this.dataSource.data = res['data']
        // control the sort
        // TODO: switch to an input
        this.sort.sort({ id: 'name', start: 'asc' } as MatSortable)
        this.dataSource.sort = this.sort;
        // end
        // display a notification
        if (showSnackBar) {
          this.dataSource.data = [];
          this.openSnackBar("list is Empty!", "Ok", 2000);
        }
       
      }
    });
  };



  ngOnInit(): void {
    
    this.get_log_list(false);
  }
    authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }

}
