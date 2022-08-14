import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root',
})
export class MobileModeService {
  mobileModeData = new BehaviorSubject<boolean>(false);
  mobileMode = this.mobileModeData.asObservable();
  //for mobile devices I don't display volume button in player because phone uses physical buttons, but on desktop in
  // small screen size I do
  volumeMobileData = new BehaviorSubject<boolean>(false);
  volumeMobile = this.volumeMobileData.asObservable();
  resizeSubscription = new Subscription();

  constructor(private rootModule: AppRoutingModule, private breakpointObserver: BreakpointObserver,
              private platformService: Platform) { }

  public async updateMobileMode(mobileMode: boolean) {
    this.mobileModeData.next(mobileMode);
    await this.rootModule.updateRoots(mobileMode);
  }

  public updateVolumeMobile(volumeMobile: boolean) {
    this.volumeMobileData.next(volumeMobile);
  }

  async setMobileModeHandlers() {
    this.resizeSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((state: BreakpointState) => {
        this.updateMobileMode(state.matches);
      });
    this.updateVolumeMobile(this.platformService.IOS || this.platformService.ANDROID);
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
