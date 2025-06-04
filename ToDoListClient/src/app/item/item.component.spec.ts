import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemComponent } from "./item.component";

describe("ItemComponent", () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display textarea when isEditing is true", /* v/p */ () => {
    component.isEditing = true;
    fixture.detectChanges();  // We mean it.

    let node = fixture.nativeElement as HTMLElement;
    let target = node.querySelector("#task-textarea");

    expect(target).toBeTruthy();
  });

  it("should display task paragraph when isEditing is false", /* v/p */ () => {
    component.isEditing = false;
    fixture.detectChanges();  // We really mean it!

    let node = fixture.nativeElement as HTMLElement;
    let target = node.querySelector("#task-span");

    expect(target).toBeTruthy();
  });

});
