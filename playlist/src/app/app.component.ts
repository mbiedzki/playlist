import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { fromEvent, Observable, Subscription } from 'rxjs';

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
  public switchToMobile: number = 768;

  constructor(private dialog: MatDialog, private overlay: OverlayContainer, private elementref: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    //set initial dark mode
    this.initMode();

    //on toggle change class of app and class of overlays and of body and save user preference
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.saveTogglePref(darkMode);
      this.setMode(darkMode);
    });

    //monitor width to switch to mobile view
    this.innerWidth = window.innerWidth;
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe(evt => {
      this.innerWidth = (evt.target as any).innerWidth;
    });
  }

  initMode() {
    const darkMode: boolean = JSON.parse(localStorage.getItem('darkMode') || 'false');
    this.setMode(darkMode);
    this.toggleControl.setValue(darkMode);
  }

  setMode(darkMode: boolean) {
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
    console.log('darkmode preference saved', mode);
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
