import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ListService } from './services/list.service';
import { DarkModeService } from './services/darkMode.service';
import { MobileModeService } from './services/mobileMode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'playlist';

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);
  darkMode: boolean = false;
  mobileMode: boolean = false;

  constructor(private dialog: MatDialog, private overlay: OverlayContainer, private elementref: ElementRef,
              private renderer: Renderer2, private listService: ListService, private darkModeService: DarkModeService,
              private mobileModeService: MobileModeService) { }

  async ngOnInit() {
    this.initDarkModeHandlers()
    this.listService.initPlayList()
    this.initMobileModeHandlers()
  }

  initDarkModeHandlers() {
    this.darkModeService.darkMode.subscribe((darkMode => {
      this.darkMode = darkMode
    }))
    this.darkModeService.initDarkMode();
    this.toggleControl.setValue(this.darkMode);
    this.toggleControl.valueChanges.subscribe((darkMode: boolean) => {
      this.darkModeService.updateDarkMode(darkMode)
      this.setAppDarkMode(darkMode)
    });
  }

  async initMobileModeHandlers() {
    this.mobileModeService.mobileMode.subscribe((mobileMode => {
      this.mobileMode = mobileMode
    }))
    await this.mobileModeService.setMobileModeHandlers()
  }


  //on toggle change class of app and class of overlays and of body and save user preference
  setAppDarkMode(darkMode: boolean) {
    this.saveTogglePref(darkMode);
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

  saveTogglePref(mode: boolean) {
    localStorage.setItem('darkMode', JSON.stringify(mode));
    console.log('dark mode preference saved', mode);
  }

  ngOnDestroy() {
  }
}
