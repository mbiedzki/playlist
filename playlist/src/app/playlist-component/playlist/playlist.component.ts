import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PlayListItem } from '../../common/item/item.component';

export const playlistItems: Array<PlayListItem> = [];

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  items: Array<PlayListItem> = playlistItems;

  constructor() {}

  ngOnInit(): void {
  }

  saveList() {
    console.log('ABC save', this.items)
  }

}
