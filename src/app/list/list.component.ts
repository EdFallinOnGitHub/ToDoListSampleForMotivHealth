import { Component } from "@angular/core";
import { ItemComponent } from "../item/item.component";
import { Item } from "../definitions/Item";
import { NewItemComponent } from "../new-item/new-item.component";
import { TemporaryItemSource } from "../operations/TemporaryItemSource";
import { ListMaintainer } from "../operations/ListMaintainer";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [ ItemComponent, NewItemComponent ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css"
})
export class ListComponent {
  items: Array<Item>;
  maintainer: ListMaintainer;

  isAdding= false;

  constructor() {
    let source = new TemporaryItemSource();
    this.items = source.items;

    this.maintainer = new ListMaintainer(this.items);
  }

  // region Event listeners

  displayAdder() {
    this.isAdding = true;
  }

  add(task: string) {
    this.maintainer.add(task);
    this.hideAdder();
  }

  hideAdder() {
    this.isAdding = false;
  }

  save(item: { order: number, uid: number, task: string, completed: boolean }) {
    this.saveChangedItem(item!);
  }

  raise(uid: number) {
    this.maintainer.raise(uid);
    this.saveChangedList();
  }

  lower(uid: number) {
    this.maintainer.lower(uid);
    this.saveChangedList();
  }

  remove(uid: number) {
    this.maintainer.remove(uid);
    this.saveChangedList();
  }

  // endregion Event listeners

  // region Local dependencies of event listeners

  private retrieveItemBy(uid: number) {
    return this.items.find(x => x.uid === uid);
  }

  private retrieveIndexBy(uid: number) {
    return this.items.findIndex(x => x.uid === uid);
  }

  private reorder(first: number, anySecond?: number) {
    if (anySecond === undefined) {
      // When item is removed, following need renumbering.
      this.reorderRemainder(first);
    }
    else {
      // When items are swapped, only they need renumbering.
      this.reorderSwapped(first, anySecond!);
    }
  }

  private reorderRemainder(first: number) {
      for (let at = first; at < this.items.length; at++) {
        this.items[at].order = at + 1;
      }
  }

  private reorderSwapped(first: number, second: number) {
    this.items[first].order = first + 1;
    this.items[second].order = second + 1;
  }

  // endregion Local dependencies of event listeners

  // region Remote-calling dependencies of event listeners

  saveNewItem(task: string) {
    /* &> save using back end,
          retrieve from back end,
          add to .items
    */
  }

  saveChangedItem(item: { order: number, uid: number, task: string, completed: boolean }) {
    /* &> save using back end */
  }

  saveChangedList() {
    /* &> save using back end */
  }

  // endregion Remote-calling dependencies of event listeners
}
