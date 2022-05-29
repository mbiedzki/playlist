import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
export class AppComponent {
  title = 'playlist';

  @HostBinding('class') className = '';

  darkMode: boolean = false;
  darkModeSubs: Subscription = new Subscription();
  darkModeToggleSubs: Subscription = new Subscription();
  darkModeToggleControl = new FormControl(false);

  mobileMode: boolean = false;
  mobileModeSubs: Subscription = new Subscription();

  selectedLang: string = 'en';
  languageModeSubs: Subscription = new Subscription();

  constructor(private dialog: MatDialog, private overlay: OverlayContainer, private elementref: ElementRef,
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

  setLanguage(lang: string) {
    this.languageService.updateLanguageMode(lang);
    this.languageService.saveLanguageMode(lang);
  }

  initLanguageModeHandlers() {
    this.languageService.initLanguageMode();
    this.languageModeSubs = this.languageService.languageMode.subscribe((lang => {
      this.selectedLang = lang.toUpperCase();
    }));
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
      this.renderer.setStyle(this.elementref.nativeElement.ownerDocument.body, 'backgroundColor', 'grey');
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
      this.renderer.setStyle(this.elementref.nativeElement.ownerDocument.body, 'backgroundColor', 'white');
    }
  }

  ngOnDestroy() {
    this.darkModeSubs.unsubscribe();
    this.mobileModeSubs.unsubscribe();
    this.darkModeToggleSubs.unsubscribe();
    this.languageModeSubs.unsubscribe();
  }
}
