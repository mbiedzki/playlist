import { Component, OnInit } from '@angular/core';
import { PlayListItem } from '../../common/item/item.component';
import { MySnackBarComponent } from '../../common/my-snack-bar/my-snack-bar.component';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  items: Array<PlayListItem> = [];

  constructor(
    private _snackBar: MySnackBarComponent,
    private fetchService: FetchService
  ) {
  }

  ngOnInit(): void {
    const storedList: string = localStorage.getItem('playlist') || '';
      const storedArray: Array<PlayListItem> = storedList?.length ? JSON.parse(storedList) : [];
      // initialization of list in fetch service
      this.fetchService.initPlayList(storedArray).subscribe((playList: Array<PlayListItem>) => {
        this.items = playList;
        console.log('play list initialized', this.items, storedArray);
      });
  }

  saveList() {
    console.log('list saved', this.items);
    localStorage.setItem('playlist', JSON.stringify(this.items));
    this._snackBar.openSnackBar('Playlist saved');
  }

}
