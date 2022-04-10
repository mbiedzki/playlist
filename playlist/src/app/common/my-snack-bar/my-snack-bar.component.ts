import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-snack-bar',
  templateUrl: './my-snack-bar.component.html',
  styleUrls: ['./my-snack-bar.component.scss']
})
export class MySnackBarComponent {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, type: string = 'info' || 'warn') {
    this._snackBar.open(message, undefined, {
      duration: this.durationInSeconds * 1000,
      panelClass: type === 'warn' ? ['mat-toolbar', 'mat-warn'] : ['mat-toolbar', 'mat-accent']
    });
  }
}
