import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'playlist';

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  constructor(private dialog: MatDialog, private overlay: OverlayContainer, private el: ElementRef, private renderer:Renderer2) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'dark-mode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
        this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'backgroundColor', 'grey');
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
        this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'backgroundColor', 'white');
      }
    });
  }
}
