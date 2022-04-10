import { Component, OnInit } from '@angular/core';
import { PlayListItem } from '../../common/item/item.component';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})

export class PlaylistComponent implements OnInit {
  items: Array<PlayListItem> = [];

  constructor(
    private fetchService: FetchService
  ) {
  }

  async ngOnInit() {
    await this.fetchService.getPlayList().subscribe((playList: Array<PlayListItem>) => {
      this.items = playList
    });
  }

  saveList() {
    this.fetchService.saveList(this.items)
  }
}
