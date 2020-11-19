import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  data: any;

  constructor(private http: HttpClient) {
  }


  get_tree_data() {
    var url = "http://localhost:5000/tree_onetable_multilayer"
    var j_object = {
      "index_name": "tree_index",
      "group_by": "item",
      "child_title": "item",
      "query": {"parent_id":"1"}
    }
    this.http.post(url, j_object).subscribe(response_data => {
      this.data = response_data

      console.log(this.data)

    })
  }

  ngOnInit(): void {
    this.get_tree_data()
  }

}
