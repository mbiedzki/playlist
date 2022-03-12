import { Component, Input, OnInit } from '@angular/core';
import { playlistItems } from '../../playlist-component/playlist/playlist.component';
import { MySnackBarComponent } from '../my-snack-bar/my-snack-bar.component';
import { J } from '@angular/cdk/keycodes';

export interface PlayListItem {
  title: string;
  artist: string;
  picture: string;
  id: number;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  @Input() item: PlayListItem = { title: '', artist: '', picture: '', id: 0 };
  @Input() type: string = 'searchList' || 'playlist';
  playlistItems: Array<PlayListItem> = playlistItems;

  constructor(
    private _snackBar: MySnackBarComponent,
  ) {
  }

  ngOnInit(): void {
  }

  addToPlaylist(item: any) {
    if (this.playlistItems?.length < 5) {
      const found: PlayListItem | undefined = this.playlistItems.find((it: PlayListItem) => it.id === item.id);
      if(found) {
        this._snackBar.openSnackBar('Item already in playlist');
      } else {
        this.playlistItems.push(item);
      }
    } else {
      this._snackBar.openSnackBar('Maximum 5 items allowed in playlist');
    }
  }

  deleteItem(item: any) {
    console.log('ABC delete', item)
    const index: number = this.playlistItems.findIndex((it: PlayListItem) => it.id === item.id);
    if(index > -1) this.playlistItems.splice(index, 1);

  }

}
