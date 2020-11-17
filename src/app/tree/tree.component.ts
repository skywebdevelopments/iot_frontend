import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface DataNodes {
  name: string;
  children?: DataNodes[];
}


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent implements OnInit {
  @Input() data: DataNodes[];
  @Input() displayParent: any;
  @Input() displayChild: any;
  @Input() title: any;
  @Input() desc: any;
  @Input() s1 = 0;
  parent_chekced = false;
  // @Output() selected_item: EventEmitter<any> = new EventEmitter();

  total_count = 0;
  categories = 0;
  treeControl = new NestedTreeControl<DataNodes>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DataNodes>();

  constructor() {


  }

  log(r) {
    console.log(r);
  }

  init(arr) {

    this.dataSource.data = arr;

  }

  uuidv4() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  ngOnInit(): void {

    let flags = [], output = [], l = this.data.length, i;
    for (i = 0; i < l; i++) {
      if (flags[this.data[i][this.displayParent]]) {
        continue;
      }
      flags[this.data[i][this.displayParent]] = true;
      output.push(this.data[i][this.displayParent]);

    }
    let arr = [];
    let children_arr = [];
    output.forEach(headerCol => {
      let item_id = this.uuidv4();
      arr.push({name: headerCol, rec_id: item_id});
      children_arr = [];
      Object.keys(this.data).forEach(item => {
        if (this.data[item][this.displayParent] == headerCol) {
          let item_child_id = this.uuidv4();
          children_arr.push({
            name: this.data[item][this.displayChild],
            rec_id: 'child_' + item_id + '_' + item_child_id,
            db_id: this.data[item]['_id']['$oid'],
            props: this.data[item]
          });

        }
      });
      arr[arr.length - 1].children = children_arr;
    });
    this.init(arr);
    console.log(arr);
    this.total_count = this.data.length;
    this.categories = output.length;

  }



  toggle_check(parent_element: any) {
    let array_of_childs = [];
    let is_checked = parent_element['srcElement'].firstChild.getAttribute('aria-checked');

    let node_id = parent_element['srcElement'].firstChild.getAttribute('id').split('-')[0];

    if (is_checked == 'true') {


      document.querySelectorAll<HTMLInputElement>('[id^=child_' + node_id + ']').forEach(item => {
        let child_is_checked = item.getAttribute('aria-checked');
        if (child_is_checked == 'true') {
          document.getElementById(item.id).click();


        }
      });


    } else {
      document.querySelectorAll<HTMLInputElement>('[id^=child_' + node_id + ']').forEach(item => {
        let child_is_checked = item.getAttribute('aria-checked');
        if (child_is_checked == 'false') {
          console.log(item.id);



        }
      });
    }
    console.log(array_of_childs);
  }

  hasChild = (_: number, node: DataNodes) => !!node.children && node.children.length > 0;
}
