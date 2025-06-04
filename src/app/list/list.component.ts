import { Component } from "@angular/core";
import { ItemComponent } from "../item/item.component";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [ ItemComponent ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css"
})
export class ListComponent {
  /* &> temporary */
  items = [
    { order: 1, uid: 1, task: "Task A", completed: false },
    { order: 4, uid: 2, task: "Task B", completed: false },
    { order: 3, uid: 3, task: "Task C", completed: false },
    { order: 2, uid: 4, task: "Task D", completed: false },
  ].sort((l, r) => l.order - r.order);

  save(item: { order: number, uid: number, task: string, completed: boolean }) {
    this.saveChangedItem(item!);
    alert("To be saved.");
  }

  lift(uid: number) {
    let at = this.retrieveIndexBy(uid);

    // Nowhere to lift to.
    if (at === 0) { return; }

    // Splice out, then back in, then save reordering.
    let local = this.items.splice(at, 1);
    this.items.splice(at -1, 0, ...local);
    this.reorder(at, at -1);

    // All changes saved immediately.
    this.saveChangedList();
  }

  drop(uid: number) {
    let at = this.retrieveIndexBy(uid);

    // Nowhere to drop to.
    if (at >= this.items.length -1) { return; }

    // Splice out, then back in, then save ordering.
    let local = this.items.splice(at, 1);
    this.items.splice(at +1, 0, ...local);
    this.reorder(at, at +1);

    // All changes saved immediately.
    this.saveChangedList();
  }

  remove(uid: number) {
    // Splice out, then save reordering.
    let at = this.retrieveIndexBy(uid);
    this.items.splice(at, 1);
    this.reorder(at);

    // All changes saved immediately.
    this.saveChangedList();
  }

  retrieveItemBy(uid: number) {
    return this.items.find(x => x.uid === uid);
  }

  retrieveIndexBy(uid: number) {
    return this.items.findIndex(x => x.uid === uid);
  }

  reorder(first: number, anySecond?: number) {
    if (anySecond === undefined) {
      for (let at = first; at < this.list.length; at++) {
        this.list[at].order = at + 1;
      }

      return;
    }

    this.list[first].order = first + 1;
    this.list[anySecond].order = anySecond + 1;
  }

  saveChangedList() {
    /* &> save using back end */
  }

  saveChangedItem(item: { order: number, uid: number, task: string, completed: boolean }) {
    /* &> save using back end */
  }

}
