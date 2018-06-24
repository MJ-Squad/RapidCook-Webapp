import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sunlead webapp';
  constructor(public translate: TranslateService, private logger: NGXLogger) {
    // i18n
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    // logging
    this.logger.debug('Your log message goes here');
    this.logger.info('Multiple', 'Argument', 'support');
  }
}
