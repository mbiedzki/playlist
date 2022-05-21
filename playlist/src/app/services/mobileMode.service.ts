import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class MobileModeService {

  private mobileModeData = new BehaviorSubject<boolean>(false);
  mobileMode = this.mobileModeData.asObservable();

  resizeObservable: Observable<Event> = new Observable<Event>();
  resizeSubscription: Subscription = new Subscription();
  public innerWidth: number = 0;
  public innerHeight: number = 0;

  constructor(private rootModule: AppRoutingModule) { }

  public async updateMobileMode(mobileMode: boolean) {
    this.mobileModeData.next(mobileMode)
    await this.rootModule.updateRoots(mobileMode)
  }

  getMobileModeFromWindowProps() {
    return this.innerWidth <= 768 || this.innerWidth < this.innerHeight
  }

  initMobileMode() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.mobileModeData.next(this.getMobileModeFromWindowProps());
    this.mobileMode.subscribe(async mobileMode => {
      await this.rootModule.updateRoots(mobileMode)
    })
  }

  //setup initial routes and watch for changes in width
  async setMobileModeHandlers() {
    this.initMobileMode()
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe(async (evt) => {
      this.innerWidth = (evt.target as any).innerWidth;
      this.innerHeight = (evt.target as any).innerHeight;
      this.mobileMode.subscribe(async mobileMode => {
        const previousMobileMode = mobileMode
        const currentMobileMode = this.getMobileModeFromWindowProps();
        if (previousMobileMode !== currentMobileMode) {
          await this.updateMobileMode(currentMobileMode)
        }
      })
    })
  }

}
