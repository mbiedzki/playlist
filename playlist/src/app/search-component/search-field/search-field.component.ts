import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

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
