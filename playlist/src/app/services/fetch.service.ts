import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayListItem } from '../common/item/item.component';
import { MySnackBarComponent } from '../common/my-snack-bar/my-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
  private headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'x-rapidapi-key': '5b8d016c10msh84d7709da21eddcp15589djsn30b9e476996e'
  };
  private playlistItems: Array<PlayListItem> = [];
  public selectedItem: any = new BehaviorSubject({ title: '', artist: '', picture: '', id: 0, preview: '' });
  sharedSelectedItem = this.selectedItem.asObservable();


  constructor(
    private http: HttpClient, private _snackBar: MySnackBarComponent
  ) {
  }

  public getItems(queryString: string, index: number = 0): Observable<any> {
    const url: string = this.url + queryString + '&index=' + index.toString();
    return this.http.get<any>(url, { headers: this.headers, observe: 'body', responseType: 'json' });
  }

  public getPlayList(): any {
    return new Observable(observer => {
      observer.next(this.playlistItems);
    });
  }

  public updatePlayList(item: PlayListItem): any {
    return new Observable(observer => {
      this.playlistItems.push(item);
      observer.next(this.playlistItems);
    });
  }

  public initPlayList(list: Array<PlayListItem>): any {
    return new Observable(observer => {
      this.playlistItems = [...list] || [];
      observer.next(this.playlistItems);
    });
  }

  public saveList(items: Array<PlayListItem>) {
    localStorage.setItem('playlist', JSON.stringify(items));
    this._snackBar.openSnackBar('Playlist saved');
  }

  nextSelected(item: PlayListItem) {
    this.selectedItem.next(item)
  }

}
