import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input({ required: true }) order!: number;
  @Input() uid?: number;
  @Input({ required: true }) task!: string;
  @Input() completed?: boolean;

  isEditing = false;

  editOrSave() {
    if (this.isEditing) {
      /* &cruft, save */
    }

    this.isEditing = !this.isEditing;
  }

}
