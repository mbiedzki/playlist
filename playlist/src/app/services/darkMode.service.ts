import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkModeData = new BehaviorSubject<boolean>(false);
  darkMode = this.darkModeData.asObservable();

  initDarkMode() {
    this.updateDarkMode(localStorage.getItem('darkMode') === 'true');
  }

  updateDarkMode(mobileMode: boolean) {
    this.darkModeData.next(mobileMode);
  }

  saveDarkMode(mobileMode: boolean) {
    localStorage.setItem('darkMode', JSON.stringify(mobileMode));
  }

}
