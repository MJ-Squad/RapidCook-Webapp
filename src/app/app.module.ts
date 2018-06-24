import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';

import * as Raven from 'raven-js';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing-module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Error Monitoring using sentry
Raven
  .config('https://b037c95bd844453fb5704534d061c435@sentry.io/1203633')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ModalModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: RavenErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
