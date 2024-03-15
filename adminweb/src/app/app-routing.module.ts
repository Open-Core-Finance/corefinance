import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { OrganizationComponent } from './system/organization/organization.component';
import { SettingsComponent } from './settings/settings.component';
import { CurrenyComponent } from './system/curreny/curreny.component';
import { OrganizationDetailsComponent } from './system/organization-details/organization-details.component';
import { HolidayComponent } from './organization-master/holiday/holiday.component';
import { BranchComponent } from './organization-master/branch/branch.component';
import { ProductCategoryComponent } from './product-master/product-category/product-category.component';
import { ExchangeRateComponent } from './product-master/exchange-rate/exchange-rate.component';
import { RateComponent } from './product-master/rate/rate.component';
import { RateSourceComponent } from './product-master/rate-source/rate-source.component';
import { DepositProductComponent } from './products/deposit-product/deposit-product.component';
import {ProductTypeComponent} from "./product-master/product-type/product-type.component";
import { GlProductComponent } from './products/gl-product/gl-product.component';
import { CryptoProductComponent } from './products/crypto-product/crypto-product.component';
import { LoanProductComponent } from './products/loan-product/loan-product.component';
import { UserComponent } from './system/user/user.component';
import { RoleComponent } from './system/role/role.component';
import { DepositAccountComponent } from './accounts/deposit-account/deposit-account.component';
import { LoanAccountComponent } from './accounts/loan-account/loan-account.component';
import { GlAccountComponent } from './accounts/gl-account/gl-account.component';
import { CryptoAccountComponent } from './accounts/crypto-account/crypto-account.component';

const routes: Routes = [
  { path: '', redirectTo: environment.frontEndUrl.organizations, pathMatch: 'full'},
  { path: environment.frontEndUrl.organizations, component: OrganizationComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.login, component: LoginComponent },
  { path: environment.frontEndUrl.settings, component: SettingsComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.currencies, component: CurrenyComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.organizationDetails, component: OrganizationDetailsComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.holidays, component: HolidayComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.branches, component: BranchComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.productCategories, component: ProductCategoryComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.productTypes, component: ProductTypeComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.exchangeRates, component: ExchangeRateComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.rates, component: RateComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.rateSources, component: RateSourceComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.depositProducts, component: DepositProductComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.glProducts, component: GlProductComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.cryptoProducts, component: CryptoProductComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.loanProducts, component: LoanProductComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.userManagement, component: UserComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.roleManagement, component: RoleComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.depositAccounts, component: DepositAccountComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.loanAccounts, component: LoanAccountComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.glAccounts, component: GlAccountComponent, canActivate: [AuthGuard] },
  { path: environment.frontEndUrl.cryptoAccounts, component: CryptoAccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
