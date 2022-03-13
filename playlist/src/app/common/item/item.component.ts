import { Component, Input, OnInit } from '@angular/core';
import { MySnackBarComponent } from '../my-snack-bar/my-snack-bar.component';
import { FetchService } from '../../services/fetch.service';

export interface PlayListItem {
  title: string;
  artist: string;
  picture: string;
  id: number;
  preview: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  @Input() item: PlayListItem = { title: '', artist: '', picture: '', id: 0, preview: '' };
  @Input() type: string = 'searchList' || 'playlist';
  playlistItems: Array<PlayListItem> = [];

  constructor(
    private _snackBar: MySnackBarComponent,
    private fetchService: FetchService
  ) {
  }

  ngOnInit(): void {
    //get current playlist from fetch service
    this.fetchService.getPlayList().subscribe((playList: Array<PlayListItem>) => {
      this.playlistItems = playList;
    });
  }

  addToPlaylist(item: PlayListItem) {
    if (this.playlistItems?.length < 5) {
      const found: PlayListItem | undefined = this.playlistItems.find((it: PlayListItem) => it.id === item.id);
      if (found) {
        this._snackBar.openSnackBar('Item already in playlist');
      } else {
        //update through observable in fetch service
        this.fetchService.updatePlayList(item).subscribe((playList: Array<PlayListItem>) => {
          this.playlistItems = playList;
          console.log('play list updated: ', item.title, this.playlistItems);
        });
      }
    } else {
      this._snackBar.openSnackBar('Maximum 5 items allowed in playlist');
    }
  }

  deleteItem(item: PlayListItem) {
    const index: number = this.playlistItems.findIndex((it: PlayListItem) => it.id === item.id);
    if (index > -1) this.playlistItems.splice(index, 1);
    console.log('item deleted: ', item.title);
  }

  playItem(item: PlayListItem) {
    if(!item?.preview) {
      this._snackBar.openSnackBar('No audio source for item');
    } else {
      var audio = new Audio(item.preview);
      audio.play();
    }
  }

}
