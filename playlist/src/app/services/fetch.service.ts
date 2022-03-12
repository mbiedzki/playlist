import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getItems(queryString: string, index: number = 0): Observable<any>{
    const url: string = this.url + queryString + '&index=' + index.toString();
    return this.http.get<any>(url, { headers: this.headers, observe: 'body', responseType: 'json' });
  }

  constructor(
    private http: HttpClient,
  ) {}
}
