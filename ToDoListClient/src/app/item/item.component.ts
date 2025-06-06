import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Item } from "../definitions/Item";

@Component({
  selector: "app-item",
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: "./item.component.html",
  styleUrl: "./item.component.css"
})
export class ItemComponent {
  @Input({ required: true }) order!: number;
  @Input() uid?: number;
  @Input({ required: true }) task!: string;
  @Input() completed?: boolean;

  @Output() doSave = new EventEmitter<Item>();
  @Output() doSetCompleted = new EventEmitter<Item>();
  @Output() doLift = new EventEmitter();
  @Output() doDrop = new EventEmitter();
  @Output() doRemove = new EventEmitter();

  isEditing = false;

  setCompleted() {
    this.doSetCompleted.emit(new Item(this.order, this.uid!, this.task, this.completed!));
  }

  editOrSave() {
    if (this.isEditing) {
      // Emitted is equivalent of Item.
      this.doSave.emit({ order: this.order!, uid: this.uid!, task: this.task!, completed: this.completed! });
    }

    this.isEditing = !this.isEditing;
  }
}
