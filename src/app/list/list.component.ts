import { Component } from '@angular/core';
import { ItemComponent } from "../item/item.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ ItemComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
}
