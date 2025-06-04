
import { Item } from "../definitions/Item";

export class ListMaintainer {
  constructor(public items: Array<Item>) {
  }

  // Major methods

  add(task: string) /* p */ {
    let toAdd = new Item(this.items.length + 1, 0, task, false);
    this.items.push(toAdd);
  }

  remove(uid: number) /* p */ {
    // Splice out, then save reordering.
    let at = this.retrieveIndexBy(uid);
    this.items.splice(at, 1);
    this.reorder(at);
  }

  raise(uid: number) /* p */ {
    let at = this.retrieveIndexBy(uid);

    // Nowhere to raise to.
    if (at === 0) { return; }

    // Splice out, then back in, then save reordering.
    let local = this.items.splice(at, 1);
    this.items.splice(at -1, 0, ...local);
    this.reorder(at, at -1);
  }

  lower(uid: number) {
    let at = this.retrieveIndexBy(uid);

    // Nowhere to lower to.
    if (at >= this.items.length -1) { return; }

    // Splice out, then back in, then save ordering.
    let local = this.items.splice(at, 1);
    this.items.splice(at +1, 0, ...local);
    this.reorder(at, at +1);
  }

  // endregion Major methods

  // region Local dependencies of major methods

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


  // endregion Local dependencies of major methods

}
