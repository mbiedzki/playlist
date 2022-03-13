import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent {
  value: string = '';
  @Output() valueEmitter = new EventEmitter<string>();

  constructor() {
  }
}
