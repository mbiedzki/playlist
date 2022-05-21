import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayListItem } from '../common/item/item.component';
import { MySnackBarComponent } from '../common/my-snack-bar/my-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
  private headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'x-rapidapi-key': '5b8d016c10msh84d7709da21eddcp15589djsn30b9e476996e',
  };

  private listData = new BehaviorSubject<Array<PlayListItem>>([]);
  list = this.listData.asObservable();

  private selectedItemData = new BehaviorSubject<PlayListItem | undefined>(undefined);
  selectedItem = this.selectedItemData.asObservable();

  constructor(
    private http: HttpClient, private _snackBar: MySnackBarComponent,
  ) {
  }

  //deezer API fetch
  getItems(queryString: string, index: number = 0): Observable<any> {
    const url: string = this.url + queryString + '&index=' + index.toString();
    return this.http.get<any>(url, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json',
    });
  }

  initPlayList() {
    const storedList: string = localStorage.getItem('playlist') || '';
    const storedArray: Array<PlayListItem> = storedList?.length ? JSON.parse(storedList) : [];
    this.updatePlayList(storedArray);
    console.log('play list initialized', storedArray);
  }

  updatePlayList(list: Array<PlayListItem>) {
    this.listData.next(list);
  }

  addToPlayList(item: PlayListItem) {
    const list: Array<PlayListItem> = this.listData.getValue();
    if (list.length < 5) {
      //check if item already exist in playlist
      const found: PlayListItem | undefined = list.find((it: PlayListItem) => it.id === item.id);
      if (found) {
        this._snackBar.openSnackBar('Item already in playlist', 'warn');
      } else {
        list.push(item);
        this.listData.next(list);
        console.log('item added: ', item.title);
        this._snackBar.openSnackBar('Item added');
      }
    } else {
      this._snackBar.openSnackBar('Maximum 5 items allowed in playlist', 'warn');
    }
  }

  deleteFromPlaylist(item: PlayListItem) {
    const list: Array<PlayListItem> = this.listData.getValue();
    const index: number = list.findIndex((it: PlayListItem) => it.id === item.id);
    if (index > -1) list.splice(index, 1);
    this.listData.next(list);
    console.log('item deleted: ', item.title);
    this._snackBar.openSnackBar('Item deleted');
  }

  saveList(list: Array<PlayListItem>) {
    localStorage.setItem('playlist', JSON.stringify(list));
    console.log('play list saved', list);
    this._snackBar.openSnackBar('Playlist saved');
  }

  updateSelectedItem(item: PlayListItem) {
    this.selectedItemData.next(item);
  }

}
