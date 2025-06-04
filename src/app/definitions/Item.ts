
export class Item {
  constructor(public order: number, public uid: number, public task: string, public completed: boolean) {
  }

  static from(item: Item) {
    return new Item(item.order, item.uid, item.task, item.completed);
  }
}
