import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root',
})
export class MobileModeService {

  private mobileModeData = new BehaviorSubject<boolean>(false);
  mobileMode = this.mobileModeData.asObservable();

  private volumeMobileData = new BehaviorSubject<boolean>(false);
  volumeMobile = this.volumeMobileData.asObservable();

  resizeSubscription: Subscription = new Subscription();

  constructor(private rootModule: AppRoutingModule, private breakpointObserver: BreakpointObserver,
              private platformService: Platform) { }

  public async updateMobileMode(mobileMode: boolean) {
    this.mobileModeData.next(mobileMode);
    await this.rootModule.updateRoots(mobileMode);
  }

  public updateVolumeMobile(volumeMobile: boolean) {
    console.log('volume visible for desktop', !volumeMobile);
    this.volumeMobileData.next(volumeMobile);
  }

  //watch for changes in device and size
  async setMobileModeHandlers() {
    this.resizeSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.updateMobileMode(true);
        } else {
          this.updateMobileMode(false);
        }
      });
    if (this.platformService.IOS || this.platformService.ANDROID) {
      this.updateVolumeMobile(true);
    } else {
      this.updateVolumeMobile(false);
    }
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

}
