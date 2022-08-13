import { Component, Input } from '@angular/core';
import { ListService } from '../../services/list.service';

export interface PlayListItem {
  title?: string;
  artist?: string;
  picture?: string;
  id?: number;
  preview?: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})

export class ItemComponent {
  @Input() item: PlayListItem = {};
  @Input() type = 'searchList' || 'playlist';

  constructor(
    private listService: ListService,
  ) {
  }

  addToPlaylist(item: PlayListItem) {
    this.listService.addToPlayList(item);
  }

  playItem(item: PlayListItem) {
    this.listService.updateSelectedItem(item);
  }

  deleteItem(item: PlayListItem) {
    this.listService.deleteFromPlaylist(item);
  }

}
