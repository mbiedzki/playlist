import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { MySnackBarComponent } from '../../common/my-snack-bar/my-snack-bar.component';
import { PlayListItem } from '../../common/item/item.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  items: Array<PlayListItem> = [];
  loading: boolean = false;
  index: number = 0;
  searchString: string = '';


  constructor(
    private fetchService: FetchService,
    private _snackBar: MySnackBarComponent,
  ) {
  }

  async loadItems($event: string) {
    //if search string changed reset component
    if (this.searchString !== $event) {
      this.searchString = $event;
      this.items = [];
      this.index = 0;
    }
    //if at least 3 chars start fetching
    if (this.searchString.length >= 3) {
      this.loading = true;
      this.fetchService.getItems(this.searchString, this.index).subscribe((res: any) => {
        this.loading = false;
        if (res?.data?.length) {
          this.items = [...this.items, ...this.decodeItems(res.data)];
          console.log('received and decoded items', {total: this.items.length, received: res.data});
          this.index++;
        } else {
          this._snackBar.openSnackBar('Please try again in few seconds - limited access to DEEZER API...');
        }
      });
    }
  }

  loadMoreItems() {
    this.loadItems(this.searchString);
    console.log('load more items');
  }

  decodeItems(items: Array<any>) {
    const decodedItems: Array<PlayListItem> = [];
    items.forEach((item: any) => {
      let newItem: PlayListItem = { title: '', artist: '', picture: '', id: 0, preview: '' };
      newItem.id = item?.id || 0;
      newItem.title = item?.title || 'no title';
      newItem.artist = item?.artist?.name || 'no artist name';
      newItem.picture = item?.album?.cover_small || '';
      newItem.preview = item?.preview || '';
      if (newItem) decodedItems.push(newItem);
    });
    return decodedItems;
  }
}
