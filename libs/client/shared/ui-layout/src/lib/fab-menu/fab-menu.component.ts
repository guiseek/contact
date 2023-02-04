import {Input, OnInit, Output, Component, EventEmitter} from '@angular/core'
import {ThemePalette} from '@angular/material/core'
import {TooltipPosition} from '@angular/material/tooltip'
import {speedDialFabMenuAnimations} from './fab-menu.animations'

export interface MatFabMenu {
  id: string | number
  icon?: string
  iconColor?: ThemePalette
  tooltip?: string
  tooltipPosition?: TooltipPosition
  color?: ThemePalette
}
export type MatFabMenuDirection = 'top' | 'bottom' | 'left' | 'right'
export type MatFabStyleDirection =
  | 'column-reverse'
  | 'row-reverse'
  | 'column'
  | 'row'

@Component({
  selector: 'contact-fab-menu',
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.scss'],
  animations: speedDialFabMenuAnimations,
})
export class FabMenuComponent implements OnInit {
  private _items: MatFabMenu[] = []
  get items() {
    return this._items
  }
  @Input()
  set items(value) {
    this._items = value
  }

  @Input()
  icon = 'settings'

  private _direction: MatFabMenuDirection = 'top'
  get direction() {
    return this._direction
  }
  @Input()
  set direction(value) {
    this._direction = value
  }

  protected layoutDirection: MatFabStyleDirection = 'column-reverse'

  private _color: ThemePalette = 'primary'
  get color() {
    return this._color
  }
  @Input()
  set color(value) {
    this._color = value
  }

  @Input()
  isActive = false

  @Input()
  disabled = false

  @Input()
  closeAfterSelected = true

  @Output()
  itemSelected = new EventEmitter<string | number>()

  ngOnInit() {
    this.layoutDirection = this.getLayoutDirection(this.direction)
  }

  protected getLayoutDirection(direction: MatFabMenuDirection) {
    switch (direction) {
      case 'top':
        return 'column-reverse'
      case 'right':
        return 'row'
      case 'left':
        return 'row-reverse'
      case 'bottom':
        return 'column'
    }
  }

  protected toggle() {
    this.isActive = !this.isActive
  }

  protected selectItem(fab: MatFabMenu) {
    this.itemSelected.emit(fab.id)
    if (this.closeAfterSelected) {
      this.isActive = false
    }
  }
}
