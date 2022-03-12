import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PlayListItem } from '../../common/item/item.component';
import { MySnackBarComponent } from '../../common/my-snack-bar/my-snack-bar.component';

export const playlistItems: Array<PlayListItem> = [];

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  items: Array<PlayListItem> = playlistItems;

  constructor(
    private _snackBar: MySnackBarComponent
  ) {}

  ngOnInit(): void {
  }

  saveList() {
    console.log('ABC save', this.items)
    localStorage.setItem("playlist", JSON.stringify(this.items));
    this._snackBar.openSnackBar('Playlist saved')
  }

}
