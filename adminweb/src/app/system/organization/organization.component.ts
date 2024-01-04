import { Component } from '@angular/core';
import { Organization } from 'src/app/classes/Organization';
import { UiOrderEvent } from 'src/app/classes/UiOrderEvent';
import { TableComponent } from 'src/app/generic-component/TableComponent';
import { environment } from 'src/environments/environment';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.sass']
})
export class OrganizationComponent extends TableComponent<Organization> {

  parent: AppComponent | undefined;

  override buildTableColumns(): string[] {
    return ["index", "id", "iconUrl", "name", "country", "phoneNumber", "email", "action"];
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    const order = new UiOrderEvent();
    order.active = "id";
    order.direction = "asc";
    this.changeOrder({ order });
  }

  getServiceUrl() {
    return environment.apiUrl.organization;
  }

  override getDeleteConfirmContent(item: Organization): string {
    return this.languageService.formatLanguage("organization.deleteConfirmContent", [item.name]);
  }

  override getDeleteConfirmTitle(item: Organization): string {
    return this.languageService.formatLanguage("organization.deleteConfirmTitle", []);
  }

  override createNewItem(): Organization {
    return new Organization();
  }

  viewOrganizationClick(organization: Organization) {
    this.organizationService.organization = organization;
    const urlToNavigate = "/" + environment.frontEndUrl.organizationDetails;
    this.router.navigateByUrl(urlToNavigate);
    this.parent?.openMenu();
  }
}
