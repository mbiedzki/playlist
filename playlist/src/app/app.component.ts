import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { PlayListItem } from './common/item/item.component';
import { FetchService } from './services/fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'playlist';

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);
  resizeObservable: Observable<Event> = new Observable<Event>();
  resizeSubscription: Subscription = new Subscription();
  public innerWidth: number = 0;
  public mobileMode: boolean = false;
  public darkMode: boolean = false;

  constructor(private dialog: MatDialog, private overlay: OverlayContainer, private elementref: ElementRef, private renderer: Renderer2,
              private rootModule: AppRoutingModule, private fetchService: FetchService) { }

  async ngOnInit() {
    this.initMode();
    await this.setWidthListener();
    await this.initPlaylist()
  }

  async initPlaylist() {
    const storedList: string = localStorage.getItem('playlist') || '';
    const storedArray: Array<PlayListItem> = storedList?.length ? JSON.parse(storedList) : [];
    // initialization of list in fetch service
    await this.fetchService.initPlayList(storedArray).subscribe((playList: Array<PlayListItem>) => {
      console.log('play list initialized', playList);
    });
  }

  //set initial dark mode
  initMode() {
    this.darkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    this.setMode(this.darkMode);
    this.toggleControl.setValue(this.darkMode);
    this.toggleControl.valueChanges.subscribe((dMode: boolean) => {
      this.setMode(dMode);
    });
  }

  //on toggle change class of app and class of overlays and of body and save user preference
  setMode(darkMode: boolean) {
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

  //setup initial routes and watch for changes in width
  async setWidthListener() {
    this.innerWidth = window.innerWidth;
    this.mobileMode = this.innerWidth <= 768;
    await this.rootModule.updateRoots(this.mobileMode)
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe(async (evt) => {
      let prevMobile = JSON.parse(JSON.stringify(this.mobileMode))
      this.innerWidth = (evt.target as any).innerWidth;
      this.mobileMode = this.innerWidth <= 768;
      if(prevMobile !== this.mobileMode) {
        await this.rootModule.updateRoots(this.mobileMode)
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
