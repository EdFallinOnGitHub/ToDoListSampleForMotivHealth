import { TestBed } from "@angular/core/testing";
import { Item } from "../definitions/Item";
import { ListMaintainer } from "./ListMaintainer";

let freshList = () => {
  let list = [
    new Item(1, 7, "Task R", false),
    new Item(2, 2, "Task S", false),
    new Item(3, 9, "Task T", false),
    new Item(4, 6, "Task U", false),
    new Item(5, 3, "Task W", false),
  ];

  return list;
}

describe("ListMaintainer", () => {
  let target: ListMaintainer;
  let list: Array<Item>;

  beforeEach(() => {
      list = freshList();
      target = new ListMaintainer(list);
  });

  describe("add()", () => {
    it("adds new Item at end of .items", /* v/p */ () => {
      let pre = target.items.length;

      let arg = new Item(3, 7, "Task U", true);
      target.add(arg);

      expect(target.items.length).toBe(pre + 1);
    });

    it("sets default values on new Item", /* v/p */ () => {
      let arg = new Item(6, 8, "Task W", true);
      target.add(arg);
      let added = target.items[target.items.length -1];

      // All default values together.
      expect(added).toEqual(arg);
    });
  });

  describe("remove()", () => {
    it("removes Item from .items", /* v/p */ () => {
        let arg = target.items[1].uid;  // 2nd of 5 items.
        let order = target.items[1].order;
        let expected = [ ...target.items.filter(x => x.order !== order) ];
        expected = expected.map(x => Item.from(x));
        expected.forEach((x, i) => x.order = i + 1);

        target.remove(arg);

        expect(target.items).toEqual(expected);
    });

    it("leaves every Item in .items with consistent .order when removed at start", /* v/p */ () => {
        let arg = target.items[0].uid;
        target.remove(arg);
        target.items.forEach((x, i) => expect(x.order).toBe(i + 1));
    });

    it("leaves every Item in .items with consistent .order when removed in middle", /* v/p */ () => {
        let arg = target.items[2].uid;
        target.remove(arg);
        target.items.forEach((x, i) => expect(x.order).toBe(i + 1));
    });
  });

  describe("raise()", () => {
    it("does nothing when called on first item", /* v/p */ () => {
        let arg = target.items[0].uid;
        let expected = [ ...target.items.map(x => Item.from(x)) ];

        target.raise(arg);

        expect(target.items).toEqual(expected);
    });

    it("moves item up by one index in the list", /* v/p */ () => {
        let arg = target.items[3].uid;  // 4th of 5 items.
        let order = target.items[1].order;

        let expected = [
          Item.from(target.items[0]), Item.from(target.items[1]),
          Item.from(target.items[3]), Item.from(target.items[2]),  // Swapped here.
          Item.from(target.items[4])
        ];
        expected[2].order = 3;
        expected[3].order = 4;

        target.raise(arg);

        expect(target.items).toEqual(expected);
    });

    it("leaves every Item in .items with consistent .order", /* v/p */ () => {
        let arg = target.items[3].uid;  // 4th of 5 items.
        target.raise(arg);
        target.items.forEach((x, i) => expect(x.order).toBe(i + 1));
    });
  });

  describe("lower()", () => {
    it("does nothing when called on last item", /* v/p */ () => {
        let arg = target.items[target.items.length -1].uid;
        let expected = [ ...target.items.map(x => Item.from(x)) ];

        target.lower(arg);

        expect(target.items).toEqual(expected);
    });

    it("moves item down by one index in the list", /* v/p */ () => {
        let arg = target.items[1].uid;  // 2nd of 5 items.
        let order = target.items[1].order;

        let expected = [
          Item.from(target.items[0]),
          Item.from(target.items[2]), Item.from(target.items[1]),  // Swapped here.
          Item.from(target.items[3]), Item.from(target.items[4])
        ];
        expected[1].order = 2;
        expected[2].order = 3;

        target.lower(arg);

        expect(target.items).toEqual(expected);
    });

    it("leaves every Item in .items with consistent .order", /* v/p */ () => {
        let arg = target.items[2].uid;  // 3rd of 5 items.
        target.lower(arg);
        target.items.forEach((x, i) => expect(x.order).toBe(i + 1));
    });
  });
});
