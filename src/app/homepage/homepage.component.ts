import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChecklistDatabase} from "../tree-multilayers/tree-multilayers.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  data: any;
  datatable_data: any;
  tree_title: any;
  show_progress_bar: any;
  @Input() searchvalue: any;

  constructor(private http: HttpClient) {
  }

  get_search_value(event) {

    this.tree_by_market({
      "$or": [
        {"market_name": {"$regex": ".*" + event + ".*"}},
        {"market_name": {"$regex": ".*" + event.toUpperCase() + ".*"}},
        {"market_name": {"$regex": ".*" + event.toLowerCase() + ".*"}},]
    })
    this.get_data_table({
      "$or": [
        {"market_name": {"$regex": ".*" + event + ".*"}},
        {"market_name": {"$regex": ".*" + event.toUpperCase() + ".*"}},
        {"market_name": {"$regex": ".*" + event.toLowerCase() + ".*"}},]
    })

    this.tree_by_folder([{"$match":{"parent_id":"1"}},{
      "$or": [
        {"item": {"$regex": ".*" + event + ".*"}},
        {"item": {"$regex": ".*" + event.toUpperCase() + ".*"}},
        {"item": {"$regex": ".*" + event.toLowerCase() + ".*"}},]
    }])

  }

  get_data_table(q) {
    var url = "http://localhost:5000/query"
    var j_object = {
      "index_name": "vc_vms_systems",
      "additional_params": {},
      "collection_name": "docs",
      "query": q
    }
    this.http.post(url, j_object).subscribe(response_data => {
      this.datatable_data = response_data
    })

  }

  tree_market_ip_by_status(q) {
    var url = "http://localhost:5000/tree_twotables_fk"
    var j_object = {
      "index_name1": "vc_vms_systems",
      "index_name2": "vc_vms_systems_status",
      "index1_group_by": "market_name",
      "index1_child_col": "system_ip",
      "index2_child_col": "system_status",
      "index2_fk": "system_ip",
      "query": q
    }
    this.http.post(url, j_object).subscribe(response_data => {
      this.data = response_data
    })
  }


  tree_by_market(q) {
    this.tree_title = "test title"
    this.show_progress_bar = true;
    var url = "http://localhost:5000/tree_onetable"
    var j_object = {
      "index_name": "vc_vms_systems",
      "group_by": "market_name",
      "child_title": "system_ip",
      "query": q
    }

    this.http.post(url, j_object).subscribe(response_data => {
      this.data = response_data
      this.show_progress_bar = false;
    })

  }

  tree_by_folder(q) {
    this.tree_title = "test title"
    this.show_progress_bar = true;
    var url = "http://localhost:5000/tree_onetable_multilayer"
    var j_object = {
      "index_name": "tree_index",
      "group_by": "item",
      "child_title": "item",
      "query": q
    }

    this.http.post(url, j_object).subscribe(response_data => {
      this.data = response_data
      this.show_progress_bar = false;
    })

  }

  radio_switch_selection(value: any) {

    let _value = value['value']
    if (_value == "1") {
      this.tree_by_market({})
      this.tree_title = "Systems by Market"
    }
    if (_value == "2") {
      this.tree_market_ip_by_status({})
      this.tree_title = "Market & systems by status"
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.searchvalue)
  }


  ngOnInit(): void {
    this.tree_by_folder({"parent_id": "1"})
    this.get_data_table({})

  }
}



