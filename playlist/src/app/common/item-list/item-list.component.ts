import { Component, OnInit } from '@angular/core';
import { PlayListItem } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  public items: Array<PlayListItem> = []
  color: string = '#DDBDF1'

  constructor() { }

  ngOnInit(): void {
  }



}
