import {MediaMatcher} from '@angular/cdk/layout'
import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core'
import {MatSidenav} from '@angular/material/sidenav'

@Component({
  exportAs: 'contactNavDrawer',
  selector: 'contact-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent implements OnDestroy {
  @ViewChild(MatSidenav) sidenav!: MatSidenav

  mobileQuery: MediaQueryList
  private _mobileQueryListener: () => void

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener)
  }
}
