import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-more-button',
  templateUrl: './more-button.component.html',
  styleUrls: ['./more-button.component.css']
})
export class MoreButtonComponent implements OnInit {
  @Output() loadMoreEmitter = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
