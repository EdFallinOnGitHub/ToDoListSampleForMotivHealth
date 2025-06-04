import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-new-item",
  imports: [
    FormsModule
  ],
  templateUrl: "./new-item.component.html",
  styleUrl: "./new-item.component.css"
})
export class NewItemComponent {
  task: string = "";

  @Output() doSave = new EventEmitter<string>();
  @Output() doCancel = new EventEmitter();
}
