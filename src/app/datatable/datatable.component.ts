import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  percentage: number;
}

let correlated_objects: any


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  array_of_charts = []
  panelOpenState = false;
  chart_display_columns = ["Name", "Count"]
  chart_display_rows = []
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<UserData>;
  @Input() show_progress_bar = false;

  maxmized_row: any
  show_row_popup = false;
  //
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: any;
  @Input() group_col: any;


  constructor(private http: HttpClient) {
  }

  max_to_row(row: any) {

    this.show_row_popup = true;
    this.maxmized_row = row['srcElement'].innerText;


  }

  min_to_row() {
    this.show_row_popup = false;
  }

  clicked_row(row: any) {
    // console.log(row)
  }

  generate_table() {
    this.show_progress_bar = true;
    // console.log(this.data)
    // 2.generate table columnds
    for (var k in correlated_objects[0]) {
      var colname = k
      this.displayedColumns.push(colname)
    }

    this.dataSource = new MatTableDataSource(correlated_objects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //
    this.show_progress_bar = false;
  }

  search_onclick(text) {

    var el1: HTMLInputElement = <HTMLInputElement>document.getElementById('search_keyword')
    el1.value = text
    el1.focus()
    el1.value = el1.value + ' '

  }

  // table filter
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if (changes){
      this.data = []
    this.displayedColumns = []
    this.data = changes.data.currentValue
    console.log(this.data)
    correlated_objects = this.data
    this.generate_table();
    }


  }

  init() {
    setTimeout(() => {

      // 1. fill the interface with obj from the parent comp.
      this.displayedColumns = []
      correlated_objects = this.data
      this.generate_table();

    }, 3000)

  }

  ngOnInit(): void {

    // this.format_chart_data1()
    // this.format_chart_data2()


    this.show_progress_bar = true;
    this.init()
  }

}


