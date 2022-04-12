import { Component, EventEmitter, Injectable, NgZone, OnInit, Output } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { PlayListItem } from '../../common/item/item.component';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public audio: any = new Audio();
  public selectedItem: any;
  private itemSubscription: any;
  public duration: number = 0;
  public progress$: Observable<number> = of(0);
  private audioSubscribtion: any;

  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
    this.itemSubscription = this.fetchService.sharedSelectedItem.subscribe((item: PlayListItem) => {
      if (!this.selectedItem || this.selectedItem?.id !== item?.id) this.selectedItem = item;
      if (this.selectedItem?.preview?.length) {
        if (this.audioSubscribtion) this.audioSubscribtion.unsubscribe()
        this.audio.currentTime = 0
        this.progress$ = of(0)
        this.duration = 0
        this.audio.src = this.selectedItem.preview;
        this.audio.play();
        this.audioSubscribtion = this.subrscribeToProgress()
        console.log('player item changed', this.selectedItem?.title);
      }
    });
    this.audio.volume = 0.5;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  volUp() {
    this.audio.volume += 0.1;
  }

  volDown() {
    this.audio.volume -= 0.1;
  }

  subrscribeToProgress() {
    return this.progress$.subscribe(() => {
      this.audio.addEventListener('timeupdate', () => {
        const currTime: number = this.audio.currentTime
        this.duration = this.audio?.duration ? this.audio.duration : 0
        this.progress$ = this.duration ? of((Math.round(100 * (currTime / this.duration)))) : of(0)
      });
    })
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
    this.itemSubscription.unsubscribe();
    this.audioSubscribtion.unsubscribe()
  }

}
