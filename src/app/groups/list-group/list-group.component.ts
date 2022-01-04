import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListGroupService } from '../../service/group/list-group.service';
import { DeleteGroupService } from '../../service/group/delete-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

export interface groupElement {
  name: string;
  active: boolean;
  rec_id: string;
}
// to be filled from the service
const ELEMENT_DATA: groupElement[] = [];
@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})


export class ListGroupComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'active'];
  dataSource = new MatTableDataSource<groupElement>(ELEMENT_DATA);
  selection = new SelectionModel<groupElement>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private service_listGroup: ListGroupService,
    private service_deleteGroup: DeleteGroupService,
    private _snackBar: MatSnackBar,

  ) { }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: groupElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // get group list
  get_group_list(showSnackBar:boolean) {

    this.service_listGroup.service_list_group().then(res => {
      // add data to the table (data source)
      this.dataSource.data = res['data']
      this.dataSource.sort = this.sort;
      // end
      // display a notification

      if(showSnackBar){

        this.openSnackBar("list is updated", "Ok",4000);
      }

    });
  };

  // delete group
  delete_group() {

    this.selection.selected.forEach(group => {
      let formData = {
        rec_id: group.rec_id
      }

      this.service_deleteGroup.service_delete_group(formData).then(res => {
        console.log(res);

        this.openSnackBar(res['data']['message'], '', 4000);

        // recall refresh
        this.get_group_list(true);

      })
    })
// !important: clear all the current selections after delete requests
    this.selection.clear();


  }

  openSnackBar(message: string, action: string,interval:number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }

  ngOnInit(): void {
    // get the data table on init.
    this.get_group_list(false);
   

    // end
  };

}
