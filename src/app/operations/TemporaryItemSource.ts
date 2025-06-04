import { Injectable } from "@angular/core";
import { Item } from "../definitions/Item";

@Injectable({ providedIn: "root" })
export class TemporaryItemSource {
  items = [
    { order: 1, uid: 1, task: "Task A", completed: false },
    { order: 4, uid: 2, task: "Task B", completed: false },
    { order: 3, uid: 3, task: "Task C", completed: false },
    { order: 2, uid: 4, task: "Task D", completed: false },
  ];

  constructor() {
    this.items.sort((l, r) => l.order - r.order);
  }
}
