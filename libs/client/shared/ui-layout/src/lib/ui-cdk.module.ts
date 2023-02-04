import {NgModule} from '@angular/core'
import {LayoutModule} from '@angular/cdk/layout'
import {DragDropModule} from '@angular/cdk/drag-drop'
import {OverlayModule} from '@angular/cdk/overlay'
import {A11yModule} from '@angular/cdk/a11y'

@NgModule({
  exports: [LayoutModule, DragDropModule, OverlayModule, A11yModule],
})
export class UiCdkModule {}
