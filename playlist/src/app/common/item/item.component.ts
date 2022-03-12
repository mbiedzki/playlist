import { Component, Input, OnInit, Output } from '@angular/core';
import { playlistItems } from '../../playlist-component/playlist/playlist.component';
import { MySnackBarComponent } from '../my-snack-bar/my-snack-bar.component';

export interface PlayListItem {
  title: string;
  artist: string;
  picture: string;
  id: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  @Input() item: PlayListItem = { title: '', artist: '', picture: '', id: '' };
  @Input() type: string = 'searchList' || 'playlist';
  playlistItems: Array<PlayListItem> = playlistItems;

  constructor(
    private _snackBar: MySnackBarComponent,
  ) {
  }

  ngOnInit(): void {
  }

  addToPlaylist($event: any) {
    if (this.playlistItems?.length < 5) {
      this.playlistItems.push($event);
    } else {
      this._snackBar.openSnackBar('Maximum 5 items allowed in playlist');
    }
  }

  deleteItem($event: any) {
    this.playlistItems = this.playlistItems.filter((item: PlayListItem) => item.id !== $event.id);

  }

}
