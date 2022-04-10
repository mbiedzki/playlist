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
  private items: Array<PlayListItem> = []
  public audio: any = new Audio();
  public selectedItem: any;

  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
    this.fetchService.getPlayList().subscribe((list: Array<PlayListItem>) => {
      this.items = list
    })
    this.fetchService.sharedSelectedItem.subscribe((item: PlayListItem) => {
      this.selectedItem = item
      this.audio.src = this.selectedItem.preview
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

}
