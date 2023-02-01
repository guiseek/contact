import {LOCALE_ID, NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {BrowserModule} from '@angular/platform-browser'
import {registerLocaleData} from '@angular/common'
import pt from '@angular/common/locales/pt'
import ptBr from '@angular/common/locales/extra/br'
import {AppComponent} from './app.component'
import {RouterModule} from '@angular/router'
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http'
import {HttpService} from '@contact/type'
import {userDataProviders} from '@contact/user/data-access'
import {StorageService, sharedDataProviders} from '@contact/shared/data-access'
import {AuthInterceptor, authDataProviders} from '@contact/auth/data-access'
import {clientDataAccessMeet} from '@contact/client/data-access-meet'
import {MAT_DATE_LOCALE} from '@angular/material/core'

registerLocaleData(pt, 'pt-BR', ptBr)

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
          loadChildren: () =>
            import('@contact/auth/feature').then((m) => m.AuthFeatureModule),
        },
        {
          path: 'user',
          loadChildren: () =>
            import('@contact/user/feature').then((m) => m.UserFeatureModule),
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
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    ...sharedDataProviders(),
    ...clientDataAccessMeet(),
    ...authDataProviders(),
    ...userDataProviders(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
