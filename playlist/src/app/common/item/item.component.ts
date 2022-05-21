import { Component, Input, OnInit } from '@angular/core';
import { MySnackBarComponent } from '../my-snack-bar/my-snack-bar.component';
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
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  @Input() item: PlayListItem = {} ;
  @Input() type: string = 'searchList' || 'playlist';
  playlistItems: Array<PlayListItem> = [];

  constructor(
    private _snackBar: MySnackBarComponent,
    private listService: ListService,
  ) {
  }

  ngOnInit(): void {
    //get current playlist from fetch service
    this.listService.list.subscribe((playList: Array<PlayListItem>) => {
      this.playlistItems = playList;
    });
  }

  addToPlaylist(item: PlayListItem) {
    this.listService.addToPlayList(item)
  }

  playItem(item: PlayListItem) {
    this.listService.updateSelectedItem(item)
  }

  deleteItem(item: PlayListItem) {
   this.listService.deleteFromPlaylist(item)
  }

}
