import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { ItemComponent } from "../item/item.component";
import { Item } from "../definitions/Item";
import { NewItemComponent } from "../new-item/new-item.component";
import { ItemSourceService } from "../operations/item-source.service";
import { ListMaintainer } from "../operations/ListMaintainer";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [ ItemComponent, NewItemComponent ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.css"
})
export class ListComponent {
  items: Array<Item> = [];
  maintainer!: ListMaintainer;

  isAdding= false;

  constructor(private source: ItemSourceService) {
    // Get existing items now, and make them locally malleable.
    source.items.subscribe(x => {
      this.items = x;
      this.maintainer = new ListMaintainer(this.items);
    });
  }

  // region Event listeners

  /* Listed in quasi-chronological order: you create,
     you move around, you check / change, you delete. */

  displayAdder() /* v */ {
    this.isAdding = true;
  }

  add(task: string) /* v */ {
    // Adding afar, then adding that here.
    this.source.add(task)
      .subscribe(x => {
        this.maintainer.add(x);
        this.hideAdder();
      });
  }

  hideAdder() /* v */ {
    this.isAdding = false;
  }

  raise(uid: number) /* v */ {
    // Changes here, then saves changes afar.
    let swapped = this.maintainer.raise(uid);
    if (swapped.length !== 2) { return; }  // At top.
    this.changeSwapped(swapped);
  }

  lower(uid: number) /* v */ {
    // Changes here, then saves changes afar.
    let swapped = this.maintainer.lower(uid);
    if (swapped.length !== 2) { return; }  // At bottom.
    this.changeSwapped(swapped);
  }

  changeSwapped(swapped: Item[]) /* v */ {
    let first = swapped[0];
    let second = swapped[1];

    // Async but synchronized changes at server.
    this.change(first)
      .subscribe(
        () => this.change(second)
          .subscribe(() => { })
      );
  }

  save(item: Item) {
    this.change(item).subscribe(() => { });
  }

  change(item: Item): Observable<void> /* v */ {
    return this.source.change(item);
  }

  remove(uid: number) /* v */ {
    // Removing here and afar.
    this.source.remove(uid)
      .subscribe(x => this.maintainer.remove(uid));
  }

  // endregion Event listeners
}
