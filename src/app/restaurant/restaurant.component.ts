import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.css"]
})
export class RestaurantComponent implements OnInit {
  constructor(private http: HttpClient) {}
  dataArray;
  start = 1;
  //get sorting details
  sortData = new FormGroup({
    search: new FormControl(""),
    sort: new FormControl(""),
    order: new FormControl("")
  });

  res = this.sortData.value;

  getFormData(start) {
    this.uiData(
      this.sortData.value.search,
      this.sortData.value.sort,
      this.sortData.value.order,
      start
    );
  }

  ngOnInit() {
    this.uiData(
      this.sortData.value.search,
      this.sortData.value.sort,
      this.sortData.value.order,
      this.start
    );
  }

  //Api Fetch Call
  uiData(searchX, sortX, orderX, startX) {
    this.http
      .get(
        "https://developers.zomato.com/api/v2.1/search?entity_id=7&entity_type=city&start=" +
          startX +
          "&count=100&sort=" +
          sortX +
          "&order=" +
          orderX +
          "&q=" +
          searchX,
        {
          headers: { "user-Key": "d16ed6fbf82d1df02c44cfb74b3e7130" }
        }
      )
      .subscribe(
        data => {
          this.dataArray = data["restaurants"];
          window.scroll(0, 0);
        },
        err => {
          console.log(err);
        }
      );
  }
}
