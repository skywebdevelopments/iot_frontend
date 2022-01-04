import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListGroupService } from '../../service/group/list-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface groupElement {
  name: string;
  active: boolean;
}
// to be filled from the service
const ELEMENT_DATA: groupElement[] = [];
@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})


export class ListGroupComponent implements OnInit {
  displayedColumns: string[] = ['name', 'active'];
  dataSource = new MatTableDataSource<groupElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private service_listGroup: ListGroupService,
    private _snackBar: MatSnackBar,

  ) { }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // get group list
  get_group_list() {

    this.service_listGroup.service_list_group().then(res => {
      // add data to the table (data source)
      this.dataSource.data =res['data']
      // end
      // display a notification
      this.openSnackBar("list is updated", "Ok");
    });
  };

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    // get the data table on init.
    this.get_group_list();
    // end
  };

}
