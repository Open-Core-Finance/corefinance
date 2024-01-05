import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AsyncPipe} from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { SettingsComponent } from './settings/settings.component';
import { OrganizationComponent } from './system/organization/organization.component';
import { RoleComponent } from './system/role/role.component';
import { AddOrganizationComponent } from './system/add-organization/add-organization.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CurrenyComponent } from './system/curreny/curreny.component';
import { AddCurrenyComponent } from './system/add-curreny/add-curreny.component';
import { HolidayComponent } from './organization-master/holiday/holiday.component';
import { AddHolidayComponent } from './organization-master/add-holiday/add-holiday.component';
import { CustomDateFormat } from './classes/DateFormat';
import { OrganizationDetailsComponent } from './system/organization-details/organization-details.component';
import { BranchComponent } from './organization-master/branch/branch.component';
import { AddBranchComponent } from './organization-master/add-branch/add-branch.component';
import { ProductCategoryComponent } from './product-master/product-category/product-category.component';
import { AddProductCategoryComponent } from './product-master/add-product-category/add-product-category.component';
import { ExchangeRateComponent } from './product-master/exchange-rate/exchange-rate.component';
import { AddExchangeRateComponent } from './product-master/add-exchange-rate/add-exchange-rate.component';
import { RateComponent } from './product-master/rate/rate.component';
import { AddRateComponent } from './product-master/add-rate/add-rate.component';
import { RateSourceComponent } from './product-master/rate-source/rate-source.component';
import { AddRateSourceComponent } from './product-master/add-rate-source/add-rate-source.component';
import { DepositProductComponent } from './products/deposit-product/deposit-product.component';
import { AddDepositProductComponent } from './products/add-deposit-product/add-deposit-product.component';
import {ProductTypeComponent} from "./product-master/product-type/product-type.component";
import {AddProductTypeComponent} from "./product-master/add-product-type/add-product-type.component";
import {BranchesSelectionComponent} from "./organization-master/branches-selection/branches-selection.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LeftMenuComponent,
    SettingsComponent,
    OrganizationComponent, AddOrganizationComponent, OrganizationDetailsComponent,
    ConfirmDialogComponent,
    CurrenyComponent,
    RoleComponent, AddCurrenyComponent,
    HolidayComponent, AddHolidayComponent,
    BranchComponent, AddBranchComponent,
    ProductCategoryComponent, AddProductCategoryComponent,
    ExchangeRateComponent, AddExchangeRateComponent,
    RateComponent, AddRateComponent,
    RateSourceComponent, AddRateSourceComponent,
    DepositProductComponent, AddDepositProductComponent, BranchesSelectionComponent,
    ProductTypeComponent, AddProductTypeComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatInputModule, MatMenuModule, MatIconModule, MatCardModule, MatSelectModule,
    MatExpansionModule, MatPaginatorModule, MatTableModule, MatSortModule, MatProgressSpinnerModule,
    MatDialogModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatDividerModule,
    MatListModule, MatToolbarModule, MatSidenavModule, AsyncPipe, MatCheckboxModule
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useClass: CustomDateFormat},
  ],
  bootstrap: [AppComponent],
  exports: [
    MatButtonModule, MatInputModule
  ]
})
export class AppModule { }
