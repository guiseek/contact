import {NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {BrowserModule} from '@angular/platform-browser'

import {AppComponent} from './app.component'
import {RouterModule} from '@angular/router'
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http'
import {HttpService} from '@contact/type'
import {userDataProviders} from '@contact/user/data-access'
import {StorageService, sharedDataProviders} from '@contact/shared/data-access'
import {AuthInterceptor, authDataProviders} from '@contact/auth/data-access'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () => import('@contact/auth/feature').then((m) => m.AuthFeatureModule),
        },
        {
          path: '',
          loadChildren: () => import('@contact/meet/feature').then((m) => m.MeetFeatureModule),
        },
        {
          path: 'user',
          loadChildren: () => import('@contact/user/feature').then((m) => m.UserFeatureModule),
        },
      ],
      {useHash: true}
    ),
  ],
  providers: [
    {
      provide: HttpService,
      useClass: HttpClient,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      deps: [StorageService],
      multi: true,
    },
    ...sharedDataProviders(),
    ...authDataProviders(),
    ...userDataProviders(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
