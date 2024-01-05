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

  selectedBranchesDisplay: Branch[] = [];
  branches: Branch[] = [];
  _selectedBranch: Branch | null = null;

  @ViewChild("selectionInput") input: ElementRef | undefined = undefined;

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
      for (let i = 0; i < value.length; i++) {
        for (const b of this.branches) {
          if (b.id == value[i]) {
            this.selectedBranchesDisplay.push(b);
          }
        }
      }
    }
  }

  propagateChange = (_: string[]) => { };
  propagateTouched = (_: string[]) => { };

  set selectedBranch(selectedBranch: Branch | null) {
    if (this.input) {
      this.input.nativeElement.value = "";
    }
    let contain = false;
    for (let branch of this.selectedBranchesDisplay) {
      if (branch.id == selectedBranch?.id) contain = true;
    }
    if (!contain && selectedBranch) {
      this.selectedBranchesDisplay.push(selectedBranch);
      this.propagateChange(this.selectedBranchesDisplay.map((value, _, __) => value.id));
    }
    this._selectedBranch = null;
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

  removeBranch(b: Branch) {
    let found = false;
    for (let i = 0; i < this.selectedBranchesDisplay.length; i++) {
      const branch = this.selectedBranchesDisplay[i];
      if (branch.id == b.id) {
        this.selectedBranchesDisplay.splice(i--, 1);
        found = true;
      }
    }
    if (found) {
      this.propagateChange(this.selectedBranchesDisplay.map((value, _, __) => value.id));
    }
    if (this.input) {
      this.input.nativeElement.value = "";
    }
    this._selectedBranch = null;
  }
}
