import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";

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

  @Output() doSave = new EventEmitter<{ order: number, uid: number, task: string, completed: boolean }>();
  @Output() doLift = new EventEmitter();
  @Output() doDrop = new EventEmitter();
  @Output() doRemove = new EventEmitter();

  isEditing = false;

  editOrSave() {
    if (this.isEditing) {
      this.doSave.emit({ order: this.order!, uid: this.uid!, task: this.task!, completed: this.completed! });
    }

    this.isEditing = !this.isEditing;
  }

}
