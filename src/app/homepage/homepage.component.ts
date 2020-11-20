import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChecklistDatabase} from "../tree-multilayers/tree-multilayers.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  data: any;
  tree_title:any;
  show_progress_bar: any;

  constructor(private http: HttpClient) {
  }


  get_tree_data() {
    var url = "http://localhost:5000/tree_twotables_fk"
    var j_object = {
      "index_name1": "vc_vms_systems",
      "index_name2": "vc_vms_systems_status",
      "index1_group_by": "market_name",
      "index1_child_col": "system_ip",
      "index2_child_col": "system_status",
      "index2_fk": "system_ip",
      // "query": {"parent_id":"1"}
    }
    this.http.post(url, j_object).subscribe(response_data => {
      this.data = response_data

      console.log(this.data)

    })
  }

  get_tree_data2() {
    var url = "http://localhost:5000/tree_onetable"
    var j_object = {
      "index_name": "vc_vms_systems",
      "group_by": "system_password",
      "child_title": "system_ip"
      // "query": {"parent_id":"1"}
    }
    this.http.post(url, j_object).subscribe(response_data => {
      this.data = response_data

      console.log(this.data)

    })
  }



  change_data_sample() {
    this.tree_title = "test title"
    this.show_progress_bar = true;
    var url = "http://localhost:5000/tree_onetable"
    var j_object = {
      "index_name": "vc_vms_systems",
      "group_by": "system_password",
      "child_title": "system_ip"
      // "query": {"parent_id":"1"}
    }
    console.log(j_object)
    this.http.post(url, j_object).subscribe(response_data => {
      this.data = response_data
      this.show_progress_bar = false;
    })

  }

  ngOnInit(): void {
  this.tree_title = 'test';
  this.show_progress_bar = true
  this.http.post("http://localhost:5000/query",{"index_name":"vc_vms_systems","query":{},"collection_name":"docs","additional_params":{}}).subscribe(data=>{
    this.data = data
  this.show_progress_bar = false
  })

  }
}



