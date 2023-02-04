import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

interface TabItem {
  label: string
  icon: string
  path: string
}

@Component({
  selector: 'contact-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavTabsComponent {
  @Input() tabs: TabItem[] = []

  get url() {
    return location.hash.replace('#', '')
  }
}
