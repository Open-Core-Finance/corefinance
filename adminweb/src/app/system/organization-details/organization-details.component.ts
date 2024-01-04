import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/classes/Currency';
import { DayOfWeek } from 'src/app/classes/DayOfWeek';
import { Organization } from 'src/app/classes/Organization';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguageService } from 'src/app/services/language.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { environment } from 'src/environments/environment';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.sass'
})
export class OrganizationDetailsComponent implements OnInit, OnDestroy{

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  _viewItem: Organization | null = null;
  addMode: boolean = false;

  listDayOfWeeks = Object.keys(DayOfWeek);

  private organizationSubscription: Subscription | null = null;

  parent: AppComponent | undefined;

  set viewItem(item: Organization| null) {
    this._viewItem = item;
  }

  get viewItem() {
    return this._viewItem;
  }

  constructor(public languageService: LanguageService, private organizationService: OrganizationService,
    private authenService: AuthenticationService, protected router: Router) {
  }

  ngOnDestroy(): void {
    this.organizationSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.organizationSubscription = this.organizationService.organizationObservable.subscribe( org => {
      this.viewItem = org;
    });
  }

  decimalMarkLabel(decimalMark: string) {
    if (decimalMark === ".") {
      return this.languageService.formatLanguage('decimalMarkPeriod', []);
    } else if (decimalMark === ",") {
      return this.languageService.formatLanguage('decimalMarkComma', []);
    } else {
      return decimalMark;
    }
  }

  currencyLabel(currency: Currency) {
    return currency.name + ' (' + currency.symbol + ')';
  }

  isDayOfWeekChecked(dayOfWeekName: string) {
    const dayOfWeeks = this.viewItem?.nonWorkingDays;
    if (dayOfWeeks) {
      for (var dayOfWeek of dayOfWeeks) {
        if (dayOfWeek === (dayOfWeekName as DayOfWeek)) {
          return true;
        }
      }
    }
    return false;
  }

  editClick($event: any) {
    this.addMode = true;
  }

  viewListClick($event: any) {
    const urlToNavigate = "/" + environment.frontEndUrl.organizations;
    this.router.navigateByUrl(urlToNavigate);
    this.parent?.closeMenu();
  }

  canViewListOrganizations(): boolean {
    return this.authenService.selectedRoleValue?.tenantId == null
  }

  cancelAdd($event: any) {
    this.addMode = false;
  }

  submitAdd($event: any) {
      this.addMode = false;
      if (!$event.organization.index) {
        $event.organization.index = -1;
      }
      this.organizationService.organization = $event.organization;
  }
}
