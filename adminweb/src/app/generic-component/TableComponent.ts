import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {Order, OrderDirection, Paging} from '../classes/Paging';
import {RestService} from '../services/rest.service';
import {GeneralApiResponse} from '../classes/GeneralApiResponse';
import {AuthenticationService} from "../services/authentication.service";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {UserMessage} from '../classes/UserMessage';
import {BehaviorSubject, Subscription} from "rxjs";
import {LanguageService} from "../services/language.service";
import {CommonService} from "../services/common.service";
import { LoginSession } from '../classes/LoginSession';
import {PageEvent} from '@angular/material/paginator';
import { UiOrderEvent } from '../classes/UiOrderEvent';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from './confirm-dialog/confirm-dialog.component';
import { PermissionService } from '../services/permission.service';
import { AccessControl, Permission, ResourceAction } from '../classes/Permission';
import { TableColumnUi, TableUi } from '../classes/ui/UiTableDisplay';
import { OrganizationService } from '../services/organization.service';

@Component({
    template: '',
    standalone: false
})
export abstract class TableComponent<T extends any> implements AfterViewInit, OnInit {

    public static NO_LIST_PERMISSION_ERROR_CODE = "permission_list_error";

    public paging: Paging | null = null;
    public message: UserMessage = new UserMessage([], []);
    protected limitOrderColumn = 1;
    public sortFields: Order[];
    protected customData: any;
    public searchText: string;
    public itemPerPage: number;
    public addMode: boolean = false;
    public detailsMode: boolean = false;
    public addingItem: T | null = null;
    commonLoginSession: LoginSession | null = null;
    pageEvent: PageEvent;
    pageSizeOptions = environment.pageSizeOptions;
    tableData: any[] = [];
    displayedColumns: string[]
    isLoadingResults: boolean = true;

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    private _sessionSubscription: Subscription | null = null;
    private _languageSubscription: Subscription | null = null;
    private _organizationSubscription: Subscription | null | undefined = null;
    private _sortSubscription: Subscription | null = null;
    private _deleteSubscription: Subscription | null = null;
    private _permissionSubscription: Subscription | null = null;
    private _permissionConfigSubscription: Subscription | null = null;
    protected tableDataSubject = new BehaviorSubject<any[]>([]);
    private _tableDataSubscription: Subscription | null = null;
    protected addModeSubject = new BehaviorSubject<boolean>(false);
    private _addModeSubscription: Subscription | null = null;
    protected pagingSubject = new BehaviorSubject<Paging | null>(null);
    private _pagingSubscription: Subscription | null = null;
    protected loadingSubject = new BehaviorSubject<boolean>(false);
    private _loadSubscription: Subscription | null = null;

    currentModulePermissions: Permission[] = [];
    tableUi: TableUi;

    public constructor(protected restService: RestService, public auth: AuthenticationService,
                          protected http: HttpClient, protected router: Router, public languageService: LanguageService,
                          protected commonService: CommonService, public dialog: MatDialog,
                          protected organizationService: OrganizationService,
                          protected permissionService: PermissionService, protected changeDetector: ChangeDetectorRef) {
        this.tableUi = this.buildTableUi();
        this.clearMessages();
        this.sortFields = [];
        this.searchText = "";
        this.itemPerPage = environment.pageSize;
        this.pageEvent = this.emptyPageEvent();
        this.displayedColumns = this.tableColumNames;
        this.customData = {};
    }

    ngOnInit(): void {
        this._sessionSubscription?.unsubscribe();
        this._sessionSubscription = this.auth.currentSessionSubject.subscribe(x =>  this.commonLoginSession = x);
        this._languageSubscription?.unsubscribe();
        this._languageSubscription = this.languageService.languageDataSubject.subscribe( languageData => this.refreshLanguage(languageData));
        this._organizationSubscription?.unsubscribe();
        this._organizationSubscription = this.organizationService.organizationSubject.subscribe(s => {
            if (s) this.customData['organizationId'] = s.id;
        });
        this._permissionSubscription?.unsubscribe();
        this._permissionSubscription = this.permissionService.currentUserPermissionSubject.subscribe(p => this.permissionReloaded(p));
        this._permissionConfigSubscription?.unsubscribe();
        this._permissionConfigSubscription = this.permissionService.permissionConfigSubject.subscribe(p => this.permissionReloaded(this.permissionService.currentUserPermissions));
        this._tableDataSubscription?.unsubscribe();
        this._tableDataSubscription = this.tableDataSubject.subscribe( (data: any[]) => {
            this.tableData = data;
            this.tableUi.dataSource = data;
        });
        this._addModeSubscription?.unsubscribe();
        this._addModeSubscription = this.addModeSubject.subscribe( addMode => {
            this.addMode = addMode;
            this.tableUi.addMode = addMode;
        });
        this._pagingSubscription?.unsubscribe();
        this._pagingSubscription = this.pagingSubject.subscribe(paging => this.paging = paging);
        this._loadSubscription?.unsubscribe();
        this._loadSubscription = this.loadingSubject.subscribe(loading => {
            this.isLoadingResults = loading;
            this.tableUi.loading = loading;
        });
    }

    ngAfterViewInit() {
        this._sortSubscription?.unsubscribe();
        if (this.sort) {
          this._sortSubscription = this.sort.sortChange.subscribe( s => this.changeOrder({order: s}));
        }
        if (this.organizationService.organization?.id) {
            this.customData['organizationId'] = this.organizationService.organization.id
        }
        const order = new UiOrderEvent();
        order.active = "id";
        order.direction = "asc";
        this.changeOrder({ order });
    }

    ngOnDestroy() {
        this._sessionSubscription?.unsubscribe();
        this._languageSubscription?.unsubscribe();
        this._organizationSubscription?.unsubscribe();
        this._sortSubscription?.unsubscribe();
        this._deleteSubscription?.unsubscribe();
        this._permissionSubscription?.unsubscribe();
        this._permissionConfigSubscription?.unsubscribe();
        this._tableDataSubscription?.unsubscribe();
        this._addModeSubscription?.unsubscribe();
        this._pagingSubscription?.unsubscribe();
        this._loadSubscription?.unsubscribe();
    }

    reloadData() {
        this.getData(this.pageEvent.pageIndex, this.sortFields, this.customData);
    }

    clearMessages() {
        this.message.clearAll();
    }

    getData(pageNumber: number, orders: Order[], customData: any) {
        this.loadingSubject.next(true);
        this.clearMessages();
        if (!this.canViewList()) {
            this.message.error.push(TableComponent.NO_LIST_PERMISSION_ERROR_CODE);
            this.changeDetector.detectChanges();
        }
        this.paging = null;
        const headers = this.restService.initRequestHeaders();
        let body = {
            pageSize: this.itemPerPage,
            pageIndex: pageNumber,
            orders: JSON.stringify(orders),
            searchText: this.searchText
        };
        if (customData) {
            body = Object.assign(body, customData);
        }
        const requestBody = this.commonService.buildPostStringBody(body);
        this.http.post<GeneralApiResponse>(this.getSearchUrl(), requestBody, {headers})
            .subscribe({next: (data: GeneralApiResponse) => this.dataLoadSuccess(data as Paging),
                error: (data: any) => {
                    this.loadingSubject.next(false);
                    this.restService.handleRestError(data, this.message);
                }
            });
    }

    protected dataLoadSuccess(paging: Paging) {
        this.loadingSubject.next(false);
        var pageEvent = this.pageEvent;
        if (paging) {
            const tableData: any[] = [];
            if (paging.result) {
                var index = (paging.pageNumber * paging.pageSize) + 1
                for ( const item of paging.result) {
                    tableData.push(this.convertItem(item, index++));
                }
            }
            this.tableDataSubject.next(tableData);
            pageEvent.pageIndex = paging.pageNumber;
            pageEvent.pageSize = paging.pageSize;
            pageEvent.length = paging.totalElements;
        } else {
            pageEvent = this.emptyPageEvent();
        }
        this.pagingSubject.next(paging);
        this.pageEvent = pageEvent;
    }

    protected convertItem(item: T, index: number): T {
        const obj: any = Object.assign(this.createNewItem() as any, item);
        obj['index'] = index;
        return obj as T;
    }

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.itemPerPage = this.pageEvent.pageSize;
        this.reloadData();
    }

    abstract getServiceUrl(): string;

    getSearchUrl(): string {
        return this.getServiceUrl() + "/";
    }

    changeOrder($event: any) {
        const order = $event.order as UiOrderEvent;
        if (this.sortFields == null) {
            this.sortFields = [];
        }
        for (let index = 0; index < this.sortFields.length; index++) {
            const orderField = this.sortFields[index];
            if (orderField.property === order.active) {
                this.sortFields.splice(index, 1);
                index--;
            }
        }
        while (this.limitOrderColumn > 0 && this.sortFields.length >= this.limitOrderColumn) {
            this.sortFields.pop();
        }
        let orderDirection = null;
        if (order.direction === "asc") {
            orderDirection = OrderDirection.ASC;
        } else {
            orderDirection = OrderDirection.DESC;
        }
        const newOrder = new Order(order.active, orderDirection);
        this.sortFields.unshift(newOrder);
        this.reloadData();
    }

    getDeleteConfirmContent(item: T): string {
        var name = (item as any).id;
        if ((item as any)['name']) {
            name = (item as any)['name'];
        }
        const messageKey = this.localizePrefix + ".deleteConfirmContent";
        return this.languageService.formatLanguage(messageKey, [name]);
    }

    getDeleteConfirmTitle(item: T): string {
     return this.languageService.formatLanguage(this.localizePrefix + ".deleteConfirmTitle", []);
    }

    showDeleteModel(item: T) {
        const message = this.getDeleteConfirmContent(item);
        const title = this.getDeleteConfirmTitle(item);
        const dialogData = new ConfirmDialogModel(title, message);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: dialogData });

        this._deleteSubscription = dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            const requestHeaders = this.restService.initApplicationJsonRequestHeaders();
            const serviceUrl = this.getDeleteUrl(item);
            this.http.delete<GeneralApiResponse>(serviceUrl, {
              headers: requestHeaders, params: { id: (item as any).id }
            }).subscribe({
              next: (_: GeneralApiResponse) => this.reloadData(),
              error: (data: any) => this.restService.handleRestError(data, this.message)
            });
          }
        });
    }

    protected getDeleteUrl(item: T): string {
        return this.getServiceUrl() + "/" + (item as any).id;
    }

    searchClick($event: any) {
        this.searchText = $event.searchText;
        this.reloadData();
    }

    cancelAdd($event: any) {
        this.addModeSubject.next(false);
    }

    submitAdd($event: any) {
        this.addingItem = this.createNewItem();
        this.addModeSubject.next(false);
        this.reloadData();
        if ($event.type == "updated") {
            this.message.success.push("update_successfull");
        } else {
            this.message.success.push("add_successfull");
        }
    }

    addClick($event: any) {
        this.clearMessages();
        const newItem = this.createNewItem();
        this.addingItem = newItem;
        this.addModeSubject.next(true);
        this.detailsMode = false;
    }

    abstract createNewItem(): T;

    editClick($event: any, item: T) {
        this.addingItem = item;
        this.addModeSubject.next(true);
        this.clearMessages();
        this.detailsMode = false;
    }

    detailsClick(item: T) {
        this.addingItem = item;
        this.addModeSubject.next(true);
        this.clearMessages();
        this.detailsMode = true;
    }

    refreshLanguage(languageData: Record<string, any>) {
    }

    emptyPageEvent() {
        const result = new PageEvent();
        result.pageSize = environment.pageSize;
        result.pageIndex = 0;
        result.length = 0;
        return result;
    }

    abstract permissionResourceName(): string;

    permissionReloaded(permissions: Permission[]) {
        this.currentModulePermissions = [];
        for (let p of permissions) {
            if (this.getServiceUrl().indexOf(p.serviceUrl) >= 0 && p.resourceType.toLowerCase() == this.permissionResourceName().toLowerCase()) {
                this.currentModulePermissions.push(p);
            }
        }
        if (this.canViewList()) {
            var err = this.message.error;
            for(let i = 0; i < err.length; i++) {
                if (err[i] == TableComponent.NO_LIST_PERMISSION_ERROR_CODE) {
                    err.splice(i, 1);
                    i--;
                }
            }
        }
    }

    canViewList(): boolean {
        return this.canDoAction(ResourceAction.COMMON_ACTION_LIST);
    }

    canAddItem(): boolean {
        return this.canDoAction(ResourceAction.COMMON_ACTION_ADD);
    }

    canUpdateItem(): boolean {
        return this.canDoAction(ResourceAction.COMMON_ACTION_UPDATE);
    }

    canDeleteItem(): boolean {
        return this.canDoAction(ResourceAction.COMMON_ACTION_DELETE);
    }

    canViewItemDetails(): boolean {
        return this.canDoAction(ResourceAction.COMMON_ACTION_VIEW);
    }

    canDoAction(action: string) {
        const a: ResourceAction | null = this.permissionService.filterResourceActionByResourceNameAndAction(
            this.permissionService.currentPermissionConfigs, this.permissionResourceName(), action
        );
        if (a != null) {
            for (let p of this.currentModulePermissions) {
                if (this.permissionService.checkPatternMatched(a, p)) {
                    return p.control != AccessControl.DENIED;
                }
            }
        }
        return environment.defaultPermissionIfNull != AccessControl.DENIED;
    }

    genericTableUiEdit($event: any) {
        this.editClick($event.event, $event.element);
    }

    protected buildTableUi(): TableUi {
        var that = this;
        var result = this.newEmptyTableUi();
        result.enabledActionAdd = () => that.canAddItem();
        result.enabledActionDelete = () => that.canDeleteItem();
        result.enabledActionEdit = this.canUpdateItem;
        result.enabledActionViewDetails = () => that.canViewItemDetails();
        result.enabledTopPaging = () => that.enabledTopPaging();
        result.indexColumnLabelKey = this.indexColumnLabelKey;
        result.columns = this.tableUiColumns;
        return result;
    }

    newEmptyTableUi(): TableUi {
        return new TableUi(this.localizePrefix + ".error.");
    }

    enabledTopPaging(): boolean {
        return false;
    }

    get indexColumnLabelKey(): string {
        return "numberInList";
    }

    get tableColumNames(): string[] {
        return this.tableUi.tableColumNames;
    }

    abstract get tableUiColumns(): TableColumnUi[];

    get localizePrefix(): string {
        return this.permissionResourceName();
    }
}
