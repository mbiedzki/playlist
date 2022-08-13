import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';
import { MySnackBarComponent } from '../../services/my-snack-bar/my-snack-bar.component';
import { PlayListItem } from '../../items/item/item.component';
import { Subscription } from 'rxjs';
import { MobileModeService } from '../../services/mobileMode.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  items: Array<PlayListItem> = [];
  loading = false;
  index = 0; //page index for deezer API
  searchString = '';
  trial = 1;
  maxTrials = 10;
  listSubscription = new Subscription();

  mobileMode = false;
  mobileModeSubs = new Subscription();

  constructor(
    private listService: ListService,
    private mobileModeService: MobileModeService,
    private snackBar: MySnackBarComponent,
  ) {
  }

  async ngOnInit() {
    this.mobileModeSubs = this.mobileModeService.mobileMode.subscribe((mobileMode => {
      this.mobileMode = mobileMode;
    }));
  }

  async loadItems(search: string) {
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
    if (this.searchString.length >= 4) {
      this.loading = true;
      this.listSubscription = this.listService.getItems(this.searchString, this.index).subscribe((res: any) => {
        if (res?.data?.length) {
          this.loading = false;
          this.trial = 1;
          this.items = [...this.items, ...this.listService.decodeItems(res.data)];
          this.index++;
        } else {
          this.trial++;
          if (this.trial <= this.maxTrials) {
            setTimeout(() => {
              this.loadItems(this.searchString);
            }, 2000);
          } else {
            this.trial = 0;
            this.loading = false;
            this.snackBar.openSnackBar('Please try again in few seconds - limited access to DEEZER API...');

          }
        }
      });
    }
  }

  async loadMoreItems() {
    await this.loadItems(this.searchString);
  }

  ngOnDestroy() {
    this.mobileModeSubs.unsubscribe();
    this.listSubscription.unsubscribe();
  }
}
