import { Injectable } from "@angular/core";
import { Item } from "../definitions/Item";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of as ObservableOf } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ItemSourceService {
  private rawItems: Array<Item> = [
    new Item(1, 1, "Task A", false),
    new Item(4, 2, "Task B", false),
    new Item(3, 3, "Task C", false),
    new Item(2, 4, "Task D", false)
  ];

  items: Observable<Array<Item>>;

  constructor() {
    this.rawItems.sort((l, r) => l.order - r.order);
    this.items = ObservableOf(this.rawItems);
  }

}
