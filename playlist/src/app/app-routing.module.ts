import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist-component/playlist/playlist.component';
import { SearchComponent } from './search-component/search/search.component';
import { DesktopViewComponent } from './desktop/desktop-view/desktop-view.component';


const mobileRoutes: Routes = [
  { path: 'playlist', component: PlaylistComponent },
  { path: 'search', component: SearchComponent },
];

const routes: Routes = [
  { path: '', component: DesktopViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public constructor(private router: Router) {}

  public async updateRoots(mobileMode: boolean) {
    console.log('update roots for mobile:', mobileMode )
    if (mobileMode) {
      this.router.resetConfig(mobileRoutes);
      await this.router.navigate(['/playlist'])
    } else {
      this.router.resetConfig(routes);
      await this.router.navigate([''])
    }
  }
}
