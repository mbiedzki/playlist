import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private languageModeData = new BehaviorSubject<string>('en');
  languageMode = this.languageModeData.asObservable();

  constructor(private translocoService: TranslocoService) {}

  initLanguageMode() {
    let storeLangMode: string | null = localStorage.getItem('langMode');
    if (!storeLangMode) storeLangMode = 'en';
    this.updateLanguageMode(storeLangMode);
    console.log('language read:', storeLangMode);
  }

  updateLanguageMode(lang: string) {
    this.languageModeData.next(lang);
    this.translocoService.setActiveLang(lang);
  }

  saveLanguageMode(lang: string) {
    localStorage.setItem('langMode', lang);
    console.log('language saved:', lang);
  }
}
