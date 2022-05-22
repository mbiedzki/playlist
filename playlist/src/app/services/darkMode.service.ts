import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {

  private darkModeData = new BehaviorSubject<boolean>(false);
  darkMode = this.darkModeData.asObservable();

  constructor() {}

  initDarkMode() {
    const storeDarkModeString = localStorage.getItem('darkMode');
    const storeDarkMode: boolean = storeDarkModeString === 'true';
    this.updateDarkMode(storeDarkMode);
    console.log('dark mode preference read', storeDarkMode);
  }

  updateDarkMode(mobileMode: boolean) {
    this.darkModeData.next(mobileMode);
  }

  saveDarkMode(mobileMode: boolean) {
    localStorage.setItem('darkMode', JSON.stringify(mobileMode));
    console.log('dark mode preference saved', mobileMode);
  }

}
