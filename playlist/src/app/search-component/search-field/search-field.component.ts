import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent {
  public value: string = '';
  public foundItems: Array<any> = [];
  public loading: boolean = false;
  private index: number = 0;

  async change(newValue: string) {
    if (this.value.length >= 5) {
      this.loading = true;
      this.fetchService.getItems('Adele', this.index).subscribe((res: any) => {
        this.loading = false;
        this.foundItems = res?.data;
        this.index++;
        console.log('foundItems:', this.foundItems);
      });
    }
  }

  constructor(
    private fetchService: FetchService
  ) {
  }

}
