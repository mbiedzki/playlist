import { Component, Injectable, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { PlayListItem } from '../../common/item/item.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public audio: any = new Audio();
  public selectedItem: any;
  private itemSubscription: any;

  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
    this.itemSubscription = this.fetchService.sharedSelectedItem.subscribe((item: PlayListItem) => {
      if(!this.selectedItem || this.selectedItem?.id !== item?.id) this.selectedItem = item;
      if (this.selectedItem?.preview?.length) {
          this.audio.src = this.selectedItem.preview
          this.audio.play()
          console.log('player item changed', this.selectedItem?.title)
      }
    })
    this.audio.volume = 0.5
  }

  play() {
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  volUp() {
    this.audio.volume += 0.1
  }

  volDown() {
    this.audio.volume -= 0.1
  }

  ngOnDestroy() {
    this.audio.pause()
    this.audio.src = ''
    this.itemSubscription.unsubscribe()
  }

}
