import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayListItem } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() items: Array<PlayListItem> = []
  @Input() type: string = 'searchList' || 'playlist';
  @Output() itemEmmiter = new EventEmitter<PlayListItem>()

  constructor() { }

  ngOnInit(): void {
  }



}
