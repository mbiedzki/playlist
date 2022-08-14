import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ListService } from './services/list.service';
import { DarkModeService } from './services/darkMode.service';
import { MobileModeService } from './services/mobileMode.service';
import { Subscription } from 'rxjs';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'playlist';
  @HostBinding('class') className = '';
  darkMode = false;
  darkModeSubs = new Subscription();
  darkModeToggleSubs = new Subscription();
  darkModeToggleControl = new FormControl(false);
  mobileMode = false;
  mobileModeSubs = new Subscription();
  selectedLang = 'en';
  languageModeSubs = new Subscription();

  constructor(private overlay: OverlayContainer, private elementRef: ElementRef,
              private renderer: Renderer2, private listService: ListService, private darkModeService: DarkModeService,
              private mobileModeService: MobileModeService, private languageService: LanguageService) { }

  async ngOnInit() {
    this.initDarkModeHandlers();
    this.initLanguageModeHandlers();
    this.listService.initPlayList();
    await this.initMobileModeHandlers();
  }

  initDarkModeHandlers() {
    this.darkModeService.initDarkMode();
    this.darkModeSubs = this.darkModeService.darkMode.subscribe((darkMode => {
      this.darkMode = darkMode;
    }));
    this.setAppDarkMode(this.darkMode);
    this.darkModeToggleControl.setValue(this.darkMode);
    this.darkModeToggleSubs = this.darkModeToggleControl.valueChanges.subscribe((darkMode: boolean) => {
      this.setAppDarkMode(darkMode);
      this.darkModeService.saveDarkMode(darkMode);
    });
  }

  setLightDarkMode(darkMode: boolean) {
    this.darkMode = darkMode;
    this.darkModeToggleControl.setValue(this.darkMode);
    this.setAppDarkMode(darkMode);
    this.darkModeService.saveDarkMode(darkMode);
  }

  initLanguageModeHandlers() {
    this.languageService.initLanguageMode();
    this.languageModeSubs = this.languageService.langMode.subscribe((lang => {
      this.selectedLang = lang.toUpperCase();
    }));
  }

  setLanguage(lang: string) {
    this.languageService.updateLanguageMode(lang);
    this.languageService.saveLanguageMode(lang);
  }

  async initMobileModeHandlers() {
    this.mobileModeSubs = this.mobileModeService.mobileMode.subscribe((mobileMode => {
      this.mobileMode = mobileMode;
    }));
    await this.mobileModeService.setMobileModeHandlers();
  }

  //on darkModeToggle change class of app and class of overlays and of body and save user preference
  setAppDarkMode(darkMode: boolean) {
    this.darkModeService.updateDarkMode(darkMode);
    const darkClassName = 'dark-mode';
    this.className = darkMode ? darkClassName : '';
    if (darkMode) {
      this.overlay.getContainerElement().classList.add(darkClassName);
      this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'backgroundColor', '#808080');
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
      this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'backgroundColor', '#FFFFFF');
    }
  }

  ngOnDestroy() {
    this.darkModeSubs.unsubscribe();
    this.mobileModeSubs.unsubscribe();
    this.darkModeToggleSubs.unsubscribe();
    this.languageModeSubs.unsubscribe();
  }
}
