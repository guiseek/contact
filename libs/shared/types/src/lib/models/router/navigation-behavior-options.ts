export type OnSameUrlNavigation = 'reload' | 'ignore'

export interface NavigationBehaviorOptions {
  onSameUrlNavigation?: Extract<OnSameUrlNavigation, 'reload'>
  skipLocationChange?: boolean
  replaceUrl?: boolean
  state?: {
    [k: string]: any
  }
}
