import { Component, ViewChild, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { LanguageMenuItem, MenuGroup, MenuItem } from './classes/Menu';
import { OrganizationService } from './services/organization.service';
import { environment } from 'src/environments/environment';
import { LanguageKeyLabelProvider, OrganizationNameLabelProvider, StaticTextLabelProvider } from './classes/LabelProvider';
import { LanguageService } from './services/language.service';
import { LoginSession } from './classes/LoginSession';
import { AuthenticationService } from './services/authentication.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { LanguageItem } from './classes/LanguageItem';
import { Role } from './classes/Role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'corefinance-adminweb';
  loginSession: LoginSession | null = null;
  menuGroups: MenuGroup[] = [];
  @ViewChild('drawer') drawer: MatDrawer | undefined;

  selectedRole: Role | null | undefined;

  languageSubscription: Subscription | null = null;
  sessionSubscription: Subscription | null = null;
  selectedRoleSubscription: Subscription | null = null;

  constructor(private languageService: LanguageService,
     private authenticationService: AuthenticationService) {
    this.loginSession = authenticationService.currentSessionValue;
    this.selectedRole = null;
  }
    
  ngOnInit(): void {
    this.sessionSubscription?.unsubscribe();
    this.sessionSubscription = this.authenticationService.currentSession.subscribe(session => this.loginSession = session);
    this.selectedRoleSubscription?.unsubscribe();
    this.selectedRoleSubscription = this.authenticationService.selectedRoleObservable.subscribe(r => {
      if (r != null) {
        this.selectedRole = r;
      }
    });
    this.rebuildMenuItems();
  }

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe();
    this.languageSubscription?.unsubscribe();
    this.selectedRoleSubscription?.unsubscribe();
  }

  rebuildMenuItems() {
    // Main Group
    this.menuGroups = [ this.masterMenu, this.productMenu, this.accountMenu, this.uamMenu, this.languageMenu ];
    // Generate menu group ID
    for (let  i = 0; i < this.menuGroups.length; i++) {
      const menuGroup = this.menuGroups[i];
      let index = i + 1;
      let menuId;
      if (index < 10) {
        menuId = "0" + index;
      } else {
        menuId = "" + index;
      }
      menuGroup.id = menuId;
    }
  }

  toggleMenuClicked() {
    this.drawer?.toggle();
  }

  languageClick(langiageItem: LanguageItem) {
    this.languageService.changeLanguage(langiageItem);
  }

  private isVisibleOrganizationMenu(auth: AuthenticationService, organizationService: OrganizationService): boolean {
    var role = auth.selectedRoleValue;
    if (role != undefined && role != null) {
      return role?.tenantId == null || role?.tenantId?.trim()?.length < 1;
    }
    return false;
  }

  private isVisibleOrganizationDetailsMenu(auth: AuthenticationService, organizationService: OrganizationService): boolean {
    var org = organizationService.organization;
    if (org != undefined && org != null) {
      return true;
    }
    return false;
  }

  private get masterMenu(): MenuGroup {
    const languageService = this.languageService;
    const organizationMenuItem = new MenuItem(environment.frontEndUrl.organizations, 
      new LanguageKeyLabelProvider(languageService, "menu.organizations", []), "assets/images/organization-icon.svg", "", this.isVisibleOrganizationMenu);
    const organizationDetailsMenuItem = new MenuItem(environment.frontEndUrl.organizationDetails, 
        new LanguageKeyLabelProvider(languageService, "menu.organizationDetails", []), "assets/images/organization-icon.svg", "", this.isVisibleOrganizationDetailsMenu);
    const curenciesMenuItem = new MenuItem(environment.frontEndUrl.curencies, new LanguageKeyLabelProvider(languageService, "menu.curencies", []), "", "security", null);
    const holidaysMenuItem = new MenuItem(environment.frontEndUrl.holidays, new LanguageKeyLabelProvider(languageService, "menu.holidays", []), "",
      "calendar_month", this.isVisibleOrganizationDetailsMenu);
    const branchesMenuItem = new MenuItem(environment.frontEndUrl.branches, new LanguageKeyLabelProvider(languageService, "menu.branches", []), "",
      "location_city", this.isVisibleOrganizationDetailsMenu);
    return new MenuGroup("", new LanguageKeyLabelProvider(languageService, "menu.groupMaster", []),
      [organizationMenuItem, organizationDetailsMenuItem, curenciesMenuItem, holidaysMenuItem, branchesMenuItem], null);
  }

  private get productMenu(): MenuGroup {
    const languageService = this.languageService;
    const depositProductMenuItem = new MenuItem(environment.frontEndUrl.depositProducts, new LanguageKeyLabelProvider(languageService, "menu.depositProduct", []), "", "account_balance", null);
    const productCategoryMenuItem = new MenuItem(environment.frontEndUrl.productCategories, new LanguageKeyLabelProvider(languageService, "menu.productCategory", []), "", "category", null);
    const loanProductMenuItem = new MenuItem(environment.frontEndUrl.loanProducts, new LanguageKeyLabelProvider(languageService, "menu.loanProduct", []), "", "real_estate_agent", null);
    loanProductMenuItem.activated = false;
    const glProductMenuItem = new MenuItem(environment.frontEndUrl.glProducts, new LanguageKeyLabelProvider(languageService, "menu.glProduct", []), "", "account_balance_wallet", null);
    glProductMenuItem.activated = false;
    const cryptoProductMenuItem = new MenuItem(environment.frontEndUrl.cryptoProducts, new LanguageKeyLabelProvider(languageService, "menu.cryptoProduct", []), "", "currency_bitcoin", null);
    cryptoProductMenuItem.activated = false;
    const exchangeRatesMenuItem = new MenuItem(environment.frontEndUrl.exchangeRates, new LanguageKeyLabelProvider(languageService, "menu.exchangeRate", []), "", "currency_exchange", null);
    const ratesMenuItem = new MenuItem(environment.frontEndUrl.rates, new LanguageKeyLabelProvider(languageService, "menu.rate", []), "", "paid", null);
    const rateSourceMenuItem = new MenuItem(environment.frontEndUrl.rateSources, new LanguageKeyLabelProvider(languageService, "menu.rateSource", []), "", "receipt", null);
    return new MenuGroup("", new LanguageKeyLabelProvider(languageService, "menu.groupProduct", []),
      [productCategoryMenuItem, depositProductMenuItem, loanProductMenuItem, glProductMenuItem, cryptoProductMenuItem, exchangeRatesMenuItem, ratesMenuItem, rateSourceMenuItem], this.isVisibleOrganizationDetailsMenu);
  }

  private get languageMenu(): MenuGroup {
    const that = this;
    const languageMenu = new  MenuGroup("", new StaticTextLabelProvider("Language"), [], null);    
    this.languageSubscription?.unsubscribe();
    this.languageSubscription = this.languageService.languageListObservable.subscribe( langs => {
      languageMenu.items = [];
      for (var item of langs) {
        const langMenuItem = new LanguageMenuItem(new StaticTextLabelProvider(item.name), item.languageKey, item, null)
        languageMenu.items.push(langMenuItem);
        langMenuItem.action = function(item: LanguageMenuItem) {
          that.languageClick(item.languageItem);
        }
      }
    });
    return languageMenu;
  }

  private get accountMenu(): MenuGroup {
    const languageService = this.languageService;
    return new MenuGroup("", new LanguageKeyLabelProvider(languageService, "menu.groupAccount", []), [], null);
  }

  private get uamMenu(): MenuGroup {
    const languageService = this.languageService;
    return new MenuGroup("", new LanguageKeyLabelProvider(languageService, "menu.groupUam", []), [], null);
  }
}
