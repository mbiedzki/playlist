import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private langModeData = new BehaviorSubject<string>('en');
  langMode = this.langModeData.asObservable();

  constructor(private translocoService: TranslocoService) {}

  initLanguageMode() {
    this.updateLanguageMode(localStorage.getItem('langMode') || 'en');
  }

  updateLanguageMode(lang: string) {
    this.langModeData.next(lang);
    this.translocoService.setActiveLang(lang);
  }

  saveLanguageMode(lang: string) {
    localStorage.setItem('langMode', lang);
  }
}
