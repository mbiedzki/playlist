import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';

@Injectable({
  providedIn: 'root',
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
    this.mobileModeData.next(mobileMode);
    await this.rootModule.updateRoots(mobileMode);
  }

  getMobileModeFromWindowProps() {
    return this.innerWidth <= 768 || this.innerWidth < this.innerHeight;
  }

  //setup initial routes
  async initMobileMode() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.mobileModeData.next(this.getMobileModeFromWindowProps());
    await this.rootModule.updateRoots(this.mobileModeData.getValue());
  }

  //watch for changes in width
  async setMobileModeHandlers() {
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe(async (evt) => {
      this.innerWidth = (evt.target as any).innerWidth;
      this.innerHeight = (evt.target as any).innerHeight;
      const previousMobileMode = this.mobileModeData.getValue();
      const currentMobileMode = this.getMobileModeFromWindowProps();
      if (previousMobileMode !== currentMobileMode) {
        await this.updateMobileMode(currentMobileMode);
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

}
