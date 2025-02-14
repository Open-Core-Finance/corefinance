import { Component, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoginSession } from '../classes/LoginSession';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
    standalone: false
})
export class HeaderComponent {

  languageData: Record<string, any> = {};
  commonLoginSession: LoginSession | null = null;
  @Output() menuIconClicked = new EventEmitter();

  constructor(public languageService: LanguageService, private router: Router, public authenticationService: AuthenticationService) {
    const that = this;
    languageService.languageDataSubject.subscribe(languageData => that.refreshLanguage(languageData));
    authenticationService.currentSessionSubject.subscribe(session => this.commonLoginSession = session);
    that.commonLoginSession = authenticationService.currentSessionValue;
  }

  refreshLanguage(languageData: Record<string, any>) {
    this.languageData = languageData;
  }

  logout($event: any): any {
    this.authenticationService.logout();
  }

  toggleMenu() {
    if (this.menuIconClicked) {
      this.menuIconClicked.emit({});
    }
  }
}
