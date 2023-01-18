import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AuthUserResponse } from '@contact/type';

@Component({
  selector: 'contact-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() user?: AuthUserResponse;
  @Input() color: ThemePalette = 'primary';
  @Input() goBackRoute: string | string[] = ['/'];

  @Input() showToggleMenu = false;
  @Output() menuToggled = new EventEmitter<void>();
}
