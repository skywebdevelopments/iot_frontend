import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.css']
})
export class GoogleChartComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  @Input() index_name: any;
  @Input() col_group: any;
  @Input() chart_title: any;
  @Input() chart_type: any;
  @Input() except_cols: any;
  array_of_charts = []
  sort_column: any;

  chart_display_columns = ["Name", "Count"]
  chart_display_rows = []

  format_chart_data() {
    this.sort_column = this.col_group
    let chart_query = {
      "query": [
        {
          "$match": {}
        },
        {
          "$group": {
            "_id": "$" + this.col_group + "",
            "group_count": {"$sum": 1},


          }
        },
        {
          "$sort": {
            sort_column: -1
          }
        }
      ],
      "index_name":
      this.index_name
    }

    this.http.post('http://localhost:5000/aggr', chart_query).subscribe(data => {
      this.chart_display_rows = []
      // console.log(data)
      Object.keys(data).forEach(index => {
        let col = data[index]["_id"]
        let row = data[index]["group_count"]


        this.chart_display_rows.push([col, row])
      })
      this.array_of_charts.push({
        "title": this.chart_title,
        "type": this.chart_type,
        "data": this.chart_display_rows,
        "columnName": this.chart_display_columns,
        "options": {},

      })

      // console.log(this.array_of_charts)
    })
  }

  ngOnInit(): void {
    this.format_chart_data()

  }

}
