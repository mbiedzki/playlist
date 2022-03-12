import { Component, OnInit } from '@angular/core';

export interface PlayListItem {
  title: string;
  artist: string;
  picture: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  private title: string = '';
  private artist: string = '';
  private picture: string = '';


  constructor() {
  }

  ngOnInit(): void {
  }

  addToPlaylist($event: any) {
    console.log('ABC', $event)
  }

}
