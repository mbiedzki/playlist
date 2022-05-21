import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private darkModeData = new BehaviorSubject<boolean>(false);
  darkMode = this.darkModeData.asObservable();

  constructor() {}

  initDarkMode() {
    const storeDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    this.updateDarkMode(storeDarkMode);
  }

  updateDarkMode(mobileMode: boolean) {
    this.darkModeData.next(mobileMode)
  }

  saveDarkMode(mode: boolean) {
    localStorage.setItem('darkMode', JSON.stringify(mode));
    console.log('dark mode preference saved', mode);
  }

}
