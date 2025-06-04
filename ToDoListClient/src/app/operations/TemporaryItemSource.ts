import { Injectable } from "@angular/core";
import { Item } from "../definitions/Item";

@Injectable({ providedIn: "root" })
export class TemporaryItemSource {
  items: Array<Item> = [
    new Item(1, 1, "Task A", false),
    new Item(4, 2, "Task B", false),
    new Item(3, 3, "Task C", false),
    new Item(2, 4, "Task D", false)
  ];

  constructor() {
    this.items.sort((l, r) => l.order - r.order);
  }
}
