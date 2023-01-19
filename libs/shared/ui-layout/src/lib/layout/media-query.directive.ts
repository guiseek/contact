import {Input, Directive, ElementRef, AfterViewInit} from '@angular/core'
import {MediaMatcher} from '@angular/cdk/layout'
import {BREAKPOINT} from './breakpoint.constant'

type LayoutBreakpoint = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type LayoutMediaQuery = MediaQueryList | MediaQueryListEvent

@Directive({selector: '[mediaQuery]'})
export class MediaQueryDirective implements AfterViewInit {
  @Input() min?: LayoutBreakpoint

  @Input() max?: LayoutBreakpoint

  constructor(private _elRef: ElementRef<HTMLElement>, readonly media: MediaMatcher) {}

  ngAfterViewInit() {
    if (this.min) this.handleQuery(this.min)
    if (this.max) this.handleQuery(this.max)
  }

  private handleQuery(name: LayoutBreakpoint) {
    const query = `(max-width: ${BREAKPOINT[name]}px)`
    const media = this.media.matchMedia(query)
    media.onchange = this.handleMedia
    this.handleMedia(media)
  }

  private handleMedia = ({matches}: LayoutMediaQuery) => {
    if (matches) this.element.classList.add('hidden')
    else this.element.classList.remove('hidden')
  }

  get element() {
    return this._elRef.nativeElement
  }
}
