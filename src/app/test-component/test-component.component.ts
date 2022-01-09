import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
const USER_INFO = [
  { "name": "John Smith", "occupation": "Advisor", "age": 36 },
  { "name": "Muhi Masri", "occupation": "Developer", "age": 28 },
  { "name": "Peter Adams", "occupation": "HR", "age": 20 },
  { "name": "Lora Bay", "occupation": "Marketing", "age": 43 }
];
const USER_SCHEMA = {
  "name": "text",
  "occupation": "text",
  "age": "number",
  "isEdit": "isEdit"
}
@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  enable_save_all = false;
  displayedColumns: string[] = ['name', 'active', 'isEdit'];
  dataSource = USER_INFO;
  dataSchema = USER_SCHEMA;
  constructor() { }


  LogData() {
    console.log(this.dataSource);

  }

  submit_all() {
    this.dataSource.forEach(item => {
      if (item['isEdit'] !== undefined && item['isEdit'] == true) {
        delete item['isEdit']
      }
      this.enable_save_all = false;
    })
    console.log('====================================');
    console.log(this.dataSource);
    console.log('====================================');
  }
  ngOnInit(): void {
    console.log(this.dataSource);

  }

}
