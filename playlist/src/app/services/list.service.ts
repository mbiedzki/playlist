import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, retry } from 'rxjs';
import { PlayListItem } from '../items/item/item.component';
import { MySnackBarComponent } from './my-snack-bar/my-snack-bar.component';
import { TranslocoService } from '@ngneat/transloco';
import { API_KEY } from '../../key';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
  headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'x-rapidapi-key': API_KEY,
  };

  listData = new BehaviorSubject<Array<PlayListItem>>([]);
  list = this.listData.asObservable();

  selectedItemData = new BehaviorSubject<PlayListItem | undefined>(undefined);
  selectedItem = this.selectedItemData.asObservable();

  constructor(
    private http: HttpClient, private snackBar: MySnackBarComponent, private translocoService: TranslocoService,
  ) {
  }

  //deezer API fetch
  getItems(queryString: string, index = 0): Observable<any> {
    const url = this.url + queryString + '&index=' + index.toString();
    return this.http.get<any>(url, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json',
    }).pipe(
      retry(5),
      catchError((err) => {
        console.log('deezer API fetch error', err);
        return err;
      }),
    );
  }

  initPlayList() {
    const storedList = localStorage.getItem('playlist');
    const storedArray: Array<PlayListItem> = storedList?.length ? JSON.parse(storedList) : [];
    this.updatePlayList(storedArray);
  }

  updatePlayList(list: Array<PlayListItem>) {
    this.listData.next(list);
  }

  addToPlayList(item: PlayListItem) {
    const list = this.listData.getValue();
    if (list.length < 5) {
      if (list.find((it: PlayListItem) => it.id === item.id)) {
        this.snackBar.openSnackBar(this.translocoService.translate('snack_duplicate'), 'warn');
      } else {
        list.push(item);
        this.listData.next(list);
        this.snackBar.openSnackBar(this.translocoService.translate('snack_added'));
      }
    } else {
      this.snackBar.openSnackBar(this.translocoService.translate('snack_max_reached'), 'warn');
    }
  }

  deleteFromPlaylist(item: PlayListItem) {
    const list = this.listData.getValue();
    const index = list.findIndex((it: PlayListItem) => it.id === item.id);
    if (index > -1) list.splice(index, 1);
    this.listData.next(list);
    this.snackBar.openSnackBar(this.translocoService.translate('snack_removed'));
  }

  saveList(list: Array<PlayListItem>) {
    localStorage.setItem('playlist', JSON.stringify(list));
    this.snackBar.openSnackBar(this.translocoService.translate(('snack_saved')));
  }

  updateSelectedItem(item: PlayListItem) {
    this.selectedItemData.next(item);
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
      decodedItems.push(newItem);
    });
    return decodedItems;
  }

}
