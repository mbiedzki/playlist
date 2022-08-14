import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist-component/playlist/playlist.component';
import { SearchComponent } from './search-component/search/search.component';
import { DesktopViewComponent } from './desktop/desktop-view/desktop-view.component';

const mobileRoutes: Routes = [
  {
    path: '',
    component: PlaylistComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: DesktopViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
  public constructor(private router: Router) {}

  public async updateRoots(mobileMode: boolean) {
    this.router.resetConfig(mobileMode ? mobileRoutes : routes);
    await this.router.navigate(['']);
  }
}
