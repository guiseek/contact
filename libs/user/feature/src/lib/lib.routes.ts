import { Route } from '@angular/router';
import { DeviceContainer } from './containers/device/device.container';

export const userFeatureRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: DeviceContainer,
  },
];
