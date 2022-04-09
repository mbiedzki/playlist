import { Component, Input, OnInit } from '@angular/core';
import { PlayListItem } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() items: Array<PlayListItem> = [];
  @Input() type: string = 'searchList' || 'playlist';

  constructor() {
  }

  ngOnInit(): void {
  }


}
