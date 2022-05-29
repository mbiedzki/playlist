import { Component, Injectable, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Observable, of, Subscription } from 'rxjs';
import { MobileModeService } from '../../services/mobileMode.service';
import { PlayListItem } from '../../common/item/item.component';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public selectedItem: any;
  private itemSubscription: any;

  public audio: any = new Audio();
  public duration: number = 0;
  public progress: Observable<number> = of(0);
  private audioSubscription: any;

  mobileMode: boolean = false;
  mobileModeSubs: Subscription = new Subscription();

  volumeMobile: boolean = false;
  volumeMobileSubs: Subscription = new Subscription();

  items: Array<PlayListItem> = [];
  itemsSubs: Subscription = new Subscription();

  constructor(private listService: ListService, private mobileModeService: MobileModeService) { }

  ngOnInit(): void {
    this.initMode();
    this.initAudio();
  }

  initMode() {
    this.mobileModeSubs = this.mobileModeService.mobileMode.subscribe((mobileMode => {
      this.mobileMode = mobileMode;
    }));
    this.volumeMobileSubs = this.mobileModeService.volumeMobile.subscribe((volumeMobile => {
      this.volumeMobile = volumeMobile;
    }));
    this.itemsSubs = this.listService.list.subscribe((playList: Array<PlayListItem>) => {
      this.items = playList;
    });
  }

  initAudio() {
    this.itemSubscription = this.listService.selectedItem.subscribe(item => {
      if (!this.selectedItem || this.selectedItem?.id !== item?.id) this.selectedItem = item;
      if (this.selectedItem?.preview?.length) {
        if (this.audioSubscription) this.audioSubscription.unsubscribe();
        this.audio.currentTime = 0;
        this.progress = of(0);
        this.duration = 0;
        this.audio.src = this.selectedItem.preview;
        this.audio.play();
        this.audioSubscription = this.subscribeToProgress();
        console.log('player item changed', this.selectedItem?.title);
      }
    });
    this.audio.volume = 0.5;
  }

  saveList() {
    this.listService.saveList(this.items);
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  volUp() {
    if (this.audio.volume < 0.9) this.audio.volume += 0.1;
  }

  volDown() {
    if (this.audio.volume > 0.1) this.audio.volume -= 0.1;
  }

  subscribeToProgress() {
    return this.progress.subscribe(() => {
      this.audio.addEventListener('timeupdate', () => {
        const currTime: number = this.audio.currentTime;
        this.duration = this.audio?.duration ? this.audio.duration : 0;
        this.progress = this.duration ? of((Math.round(100 * (currTime / this.duration)))) : of(0);
      });
    });
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
    this.itemSubscription?.unsubscribe();
    this.audioSubscription?.unsubscribe();
    this.mobileModeSubs.unsubscribe();
    this.itemsSubs.unsubscribe();
  }

}
