import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from './settings.component';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private _dialog: MatDialog) {}

  open() {
    this._dialog.open(SettingsComponent);
  }
}
