import {LOCALE_ID, NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {BrowserModule} from '@angular/platform-browser'
import {registerLocaleData} from '@angular/common'
import pt from '@angular/common/locales/pt'
import ptBr from '@angular/common/locales/extra/br'
import {AppComponent} from './app.component'
import {Router as RouterImpl, RouterModule} from '@angular/router'
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import {HttpService, Router} from '@contact/shared/types'
import {CLIENT_USER_PROVIDERS} from '@contact/client/data-access-user'
import {StorageService, SHARED_PROVIDERS} from '@contact/shared/data-access'
import {
  AuthInterceptor,
  CLIENT_AUTH_PROVIDERS,
} from '@contact/client/data-access-auth'
import {
  CLIENT_MEET_PROVIDERS,
  PeerConfig,
} from '@contact/client/data-access-meet'
import {MAT_DATE_LOCALE} from '@angular/material/core'
import {UiMeetModule} from '@contact/client/shared/ui-meet'

registerLocaleData(pt, 'pt-BR', ptBr)

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiMeetModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('@contact/client/feature-auth').then(
              (m) => m.ClientFeatureAuthModule
            ),
        },
        {
          path: 'user',
          loadChildren: () =>
            import('@contact/client/feature-user').then(
              (m) => m.UserFeatureModule
            ),
        },
        {
          path: 'meet',
          loadChildren: () =>
            import('@contact/client/feature-meet').then(
              (m) => m.FeatureMeetModule
            ),
        },
        {
          path: '',
          loadChildren: () =>
            import('@contact/client/feature-home').then(
              (m) => m.FeatureHomeModule
            ),
        },
        // {
        //   path: '',
        //   loadChildren: () =>
        //     import('@contact/meet/feature').then((m) => m.MeetFeatureModule),
        // },
      ],
      {
        useHash: true
      }
    ),
  ],
  providers: [
    {
      provide: HttpService,
      useClass: HttpClient,
    },
    {
      provide: Router,
      useClass: RouterImpl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      deps: [StorageService],
      multi: true,
    },
    {
      provide: PeerConfig,
      useFactory: () => {
        return new PeerConfig({
          iceServers: [],
        })
      },
    },
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    ...SHARED_PROVIDERS,
    ...CLIENT_MEET_PROVIDERS,
    ...CLIENT_AUTH_PROVIDERS,
    ...CLIENT_USER_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
