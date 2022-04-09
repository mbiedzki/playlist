import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlaylistComponent } from './playlist-component/playlist/playlist.component';
import { SearchComponent } from './search-component/search/search.component';
import { SearchFieldComponent } from './search-component/search-field/search-field.component';
import { ItemListComponent } from './common/item-list/item-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ItemComponent } from './common/item/item.component';
import { MoreButtonComponent } from './search-component/more-button/more-button.component';
import { MatDividerModule } from '@angular/material/divider';
import { MySnackBarComponent } from './common/my-snack-bar/my-snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    SearchComponent,
    SearchFieldComponent,
    ItemListComponent,
    ItemComponent,
    MoreButtonComponent,
    MySnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatListModule,
    MatGridListModule,
    MatSlideToggleModule,
    FlexModule,
  ],
  providers: [
    MySnackBarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
