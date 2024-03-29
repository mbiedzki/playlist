import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayListItem } from '../../items/item/item.component';
import { ListService } from '../../services/list.service';
import { Subscription } from 'rxjs';
import { MobileModeService } from '../../services/mobileMode.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})

export class PlaylistComponent implements OnInit, OnDestroy {
  items: Array<PlayListItem> = [];
  itemsSubs = new Subscription();
  mobileMode = false;
  mobileModeSubs = new Subscription();

  constructor(
    private listService: ListService,
    private mobileModeService: MobileModeService,
  ) {
  }

  async ngOnInit() {
    this.itemsSubs = this.listService.list.subscribe((playList: Array<PlayListItem>) => {
      this.items = playList;
    });
    this.mobileModeSubs = this.mobileModeService.mobileMode.subscribe((mobileMode => {
      this.mobileMode = mobileMode;
    }));
  }

  ngOnDestroy() {
    this.itemsSubs.unsubscribe();
    this.mobileModeSubs.unsubscribe();
  }

}
