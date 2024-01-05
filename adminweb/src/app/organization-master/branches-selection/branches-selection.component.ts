import {Component, Input, forwardRef, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {LanguageService} from "../../services/language.service";
import {CommonService} from "../../services/common.service";
import {RestService} from "../../services/rest.service";
import {HttpClient} from "@angular/common/http";
import {Branch} from "../../classes/organizations/Branch";
import {GeneralApiResponse} from "../../classes/GeneralApiResponse";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-branches-selection',
  templateUrl: './branches-selection.component.html',
  styleUrl: './branches-selection.component.sass',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BranchesSelectionComponent),
      multi: true
    }
  ]
})
export class BranchesSelectionComponent implements OnInit, ControlValueAccessor {

  _selectedBranches: string[] =[];
  selectedBranchesDisplay: Branch[] = [];
  branches: Branch[] = [];
  _selectedBranch: Branch | null = null;

  @ViewChild("selectionInput") input!: ElementRef;

  constructor(public languageService: LanguageService, private commonService: CommonService,
              private restService: RestService, private http: HttpClient) {
  }


  ngOnInit(): void {
    let headers = this.restService.initRequestHeaders();
    this.http.post<GeneralApiResponse>(environment.apiUrl.branch + "/", {}, { headers}).subscribe({
      next: (data: GeneralApiResponse) => {
        if (data.status === 0) {
          this.branches = (data.result as Branch[]);
        }
      }, error: (data: any) => {
        console.log(data)
      }
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  writeValue(value: string[]): void {
    if (value !== undefined) {
      this._selectedBranches = value;
    }
  }

  propagateChange = (_: string[]) => { };
  propagateTouched = (_: string[]) => { };

  set selectedBranches(selectedBranches: string[]) {
    this._selectedBranches = selectedBranches;
  }

  get selectedBranches() {
    return this._selectedBranches;
  }

  set selectedBranch(selectedBranch: Branch | null) {
    this._selectedBranch = selectedBranch;
    this.input.nativeElement.value = "";
    let contain = false;
    for (let branch of this.selectedBranchesDisplay) {
      if (branch.id == selectedBranch?.id) contain = true;
    }
    if (!contain && selectedBranch) {
      this.selectedBranchesDisplay.push(selectedBranch);
      this._selectedBranches.push(selectedBranch.id);
    }
  }

  get selectedBranch(): Branch | null {
    return this._selectedBranch;
  }

  isSelectedBranch(branch: Branch) {
    for (const b of this.selectedBranchesDisplay) {
      if (branch.id == b.id) return true;
    }
    return false;
  }
}
