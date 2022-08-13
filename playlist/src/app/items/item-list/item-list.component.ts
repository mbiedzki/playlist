import { Component, Input } from '@angular/core';
import { PlayListItem } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input() items: Array<PlayListItem> = [];
  @Input() type = 'searchList' || 'playlist';

}
