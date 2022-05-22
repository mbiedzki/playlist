import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';
import { MySnackBarComponent } from '../../common/my-snack-bar/my-snack-bar.component';
import { PlayListItem } from '../../common/item/item.component';
import { Subscription } from 'rxjs';
import { MobileModeService } from '../../services/mobileMode.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  items: Array<PlayListItem> = [];
  loading: boolean = false;
  index: number = 0; //page index for deezer API
  searchString: string = '';
  trial: number = 1;
  maxTrials: number = 10;
  listSubscription: Subscription = new Subscription();

  mobileMode: boolean = false;
  mobileModeSubs: Subscription = new Subscription();

  constructor(
    private listService: ListService,
    private mobileModeService: MobileModeService,
    private _snackBar: MySnackBarComponent,
  ) {
  }

  async ngOnInit() {
    this.mobileModeSubs = this.mobileModeService.mobileMode.subscribe((mobileMode => {
      this.mobileMode = mobileMode;
    }));
  }

  async loadItems(search: string) {
    //if search string changed reset component
    if (this.searchString !== search) {
      this.searchString = search;
      this.items = [];
      this.index = 0;
      this.trial = 1;
    }
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
      this.loading = false;
    }
    //if at least 4 chars start fetching
    if (this.searchString.length >= 4) {
      this.loading = true;
      this.listSubscription = this.listService.getItems(this.searchString, this.index).subscribe((res: any) => {
        if (res?.data?.length) {
          this.loading = false;
          this.trial = 1;
          this.items = [...this.items, ...this.decodeItems(res.data)];
          this.index++;
          console.log('received and decoded items', {
            search: this.searchString,
            total: this.items,
            received: res.data,
          });
        } else {
          this.trial++;
          if (this.trial <= this.maxTrials) {
            setTimeout(() => {
              console.log('trying to fetch', this.trial);
              this.loadItems(this.searchString);
            }, 2000);
          } else {
            this.trial = 0;
            this.loading = false;
            this._snackBar.openSnackBar('Please try again in few seconds - limited access to DEEZER API...');

          }
        }
      });
    }
  }

  async loadMoreItems() {
    await this.loadItems(this.searchString);
    console.log('load more items', this.searchString, this.index);
  }

  decodeItems(items: Array<any>) {
    const decodedItems: Array<PlayListItem> = [];
    items.forEach((item: any) => {
      let newItem: PlayListItem = {
        title: item?.title,
        artist: item?.artist?.name,
        picture: item?.album?.cover_small,
        id: item?.id,
        preview: item?.preview,
      };
      if (newItem.id && newItem.title && newItem.artist && newItem.picture && newItem.preview) decodedItems.push(
        newItem);
    });
    return decodedItems;
  }

  ngOnDestroy() {
    this.mobileModeSubs.unsubscribe();
    this.listSubscription.unsubscribe();
  }
}
