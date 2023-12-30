import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Branch } from '../../classes/organizations/Branch';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { CommonService } from 'src/app/services/common.service';
import { RestService } from 'src/app/services/rest.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralApiResponse } from 'src/app/classes/GeneralApiResponse';
import { DayOfWeek } from 'src/app/classes/DayOfWeek';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.sass'
})
export class AddBranchComponent {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  _addingItem: Branch | null = null;
  listDayOfWeeks = Object.keys(DayOfWeek);

  addBranchForm = new FormGroup({
    index: new FormControl(0),
    id: new FormControl(""),
    name: new FormControl('', {nonNullable: true}),
    inheritNonWorkingDays: new FormControl(true, {nonNullable: true}),
    nonWorkingDays: new FormControl<DayOfWeek[]>([]),
    streetAddressLine1: new FormControl(""),
    city: new FormControl(""),
    state: new FormControl(""),
    country: new FormControl(""),
    zipPostalCode: new FormControl(""),
    phoneNumber: new FormControl(""),
    email: new FormControl(""),
    parentBranchId: new FormControl("")
  });
  message: Record<string, any[]> = {
    success: [],
    error: []
  };

  constructor(public languageService: LanguageService, private commonService: CommonService,
    private restService: RestService, private http: HttpClient) {
  }

  saveClick($event: any): any {
    this.clearMessages();
    const formData = this.addBranchForm.value;
    if (this.commonService.isNullOrEmpty(formData.name)) {
      this.message['error'].push("name_empty")
    }
    if (this.commonService.isNullOrEmpty(formData.phoneNumber)) {
      this.message['error'].push("phone_empty")
    }
    if (this.commonService.isNullOrEmpty(formData.email)) {
      this.message['error'].push("email_empty")
    }
    if (this.commonService.isNullOrEmpty(formData.id)) {
      delete formData.id;
    }
    if (this.message['error'].length < 1) {
      const requestHeaders = this.restService.initApplicationJsonRequestHeaders();
      let serviceUrl = environment.apiUrl.branch + "/";
      var responseHandler = {
        next: (data: GeneralApiResponse) => {
          if (this.save) {
            $event.organization = data.result;
            this.save.emit($event);
          }
        }, error: (data: any) => {
          const message = this.message;
          if (data.statusText) {
            message['error'].push(data.statusText);
          } else if (data.statusCode) {
            message['error'].push(data.statusCode);
          } else {
            message['error'].push("Unknown error: " + JSON.stringify(data));
          }
        }
      };
      if (formData.id) {
        serviceUrl = environment.apiUrl.branch + "/" + formData.id;
        this.http.put<GeneralApiResponse>(serviceUrl, formData, {
          headers: requestHeaders, params: {}
        }).subscribe(responseHandler);
      } else {
        serviceUrl = environment.apiUrl.branch + "/create";
        this.http.post<GeneralApiResponse>(serviceUrl, formData, {
          headers: requestHeaders, params: {}
        }).subscribe(responseHandler);
      }
    }
  }

  cancelClick($event: any): any {
    if (this.cancel) {
      this.cancel.emit($event);
    }
  }

  clearMessages() {
    this.message = {
      success: [],
      error: []
    };
  }

  @Input() set addingItem(item: Branch| null) {
    this._addingItem = item;
    if (item) {
      this.addBranchForm.setValue(item);
    } else {
      this.addBranchForm.setValue(new Branch());
    }
  }

  isDayOfWeekChecked(dayOfWeekName: string) {
    const dayOfWeeks = this.addBranchForm.controls.nonWorkingDays.value;
    if (dayOfWeeks) {
      for (var dayOfWeek of dayOfWeeks) {
        if (dayOfWeek === (dayOfWeekName as DayOfWeek)) {
          return true;
        }
      }
    }
    return false;
  }

  dayOfWeekChanged(dayOfWeekName: string, event: MatCheckboxChange) {
    const dayOfWeeks = this.addBranchForm.controls.nonWorkingDays.value;
    if (dayOfWeeks) {
      if (event.checked == false) {
        for (let i = 0; i < dayOfWeeks.length; i++) {
          if ((dayOfWeekName as DayOfWeek) == dayOfWeeks[i]) {
            dayOfWeeks.splice(i, 1);
            i--;
          }
        }
      } else {
        dayOfWeeks.push(dayOfWeekName as DayOfWeek);
      }
    }
  }
}
