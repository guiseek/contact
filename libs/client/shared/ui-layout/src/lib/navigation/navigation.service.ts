import {State, freeze} from '@contact/shared/data-access'

type NavigationItemType = 'link' | 'divider' | 'heading'

interface NavigationLink {
  type: 'link'
  route: string[] | string
  icon?: string
  label: string
}
interface NavigationDivider {
  type: 'divider'
}
interface NavigationHeading {
  type: 'heading'
  label: string
}

type NavigationItem = NavigationLink | NavigationDivider | NavigationHeading

interface NavigationState {
  items: NavigationItem[]
}

const initialState = freeze<NavigationState>({
  items: [],
})

export class NavigationService extends State<NavigationState> {
  readonly items$ = this.select((state) => state.items)

  constructor() {
    super(initialState)
  }

  setItems(items: NavigationItem[]) {
    this.setState({items})
  }
}
