import { CreateElement, VueConstructor, VNode } from 'vue';

export interface ITypeDefinition {
   formatter?: (value: any, options: any, h: CreateElement) => string | VNode;
   filterComponent?: string;
   filterParams?: any;
}

export enum FilterOperator {
    Equals = "eq",
    GreaterThan = "gt",
    GraterThanOrEqual = "gte",
    LowerThan = "lt",
    LowerThanOrEqual = "lte",
    NotEqals = "neq",
    In = "in",
    Contains = "substr"
 }

export interface IColumnFilter {
   field: string;
   groups: IFilterGroup[];
}

export interface IFilterValue {
   value: any;
   operator?: FilterOperator;
   field: string;
}

export interface IFilterGroup {
   filters: IFilterValue[];
   tag?: string;
}

export enum SortDirection {
   Asc = "asc",
   Desc = "desc"
}

export interface ISortField {
   field: string;
   direction: SortDirection;
}

export interface IFieldInfo {
   field: string;
   dataType: string | undefined;
}

export interface IDataRequest {
   page: number;
   pageSize: number;
   sorting: ISortField[];
   filters: IFilterGroup[];
   fields: IFieldInfo[];
}

export interface IDataRequest {
    page: number;
    pageSize: number;
    sorting: ISortField[];
    filters: IFilterGroup[];
    fields: IFieldInfo[];
    args: any | null;
 }
 
 export interface IDataPromise {
    resolver: (onSuccess: (data: any[], total: number, uri: string, pageUri: string) => void, onError: (error?: any) => void, onAlways: () => void) => void;
 }

export interface IDataSource {
   load: (request: IDataRequest) => IDataPromise;
   name: string;
}

export interface IUrlSet {
   dataUrl: string;
   pageUrl: string;
}

export interface IDataPage {
   items: any[];
   total: number;
}

export interface ICalendar {
   dateFormat?: string;
   datePlaceholder?: string;
   dateTimeFormat?: string;
   dateTimePlaceholder?: string;
   timeFormat?: string;
   timePlaceholder?: string;
   weekStart?: number;
   dayNames?: string[];
   monthNamesFull?: string[];
   monthNamesShort?: string[];
   yearFormat?: string;
   yearRangeFormat?: string;
   monthFormat?: string;
   monthFirst?: boolean;
}

export interface ISettingsArgs {
   idField?: string;
   thousandSeparator?: string;
   decimalPrecision?: number;
   decimalSeparator?: string;
   ignoreDateOffset?: boolean;
   defaultRemoteSource?: string;
}

export interface ILang {
   yes: string;
   no: string;
   pagerPage: string;
   pagerOfPages: string;
   firstPage: string;
   previousPage: string;
   nextPage: string;
   lastPage: string;
   pageListItemTitle: string;
   filterAccept: string;
   filterReset: string;
   dropdownLabel: string;
   rangeFrom: string;
   rangeTo: string;
   containsValue: string;
   valueEquals: string;
}

export interface ILocale {
   calendar: ICalendar;
   settings: ISettingsArgs;
   text: ILang;
}

export interface ILocales {
   plPL: ILocale
}

export interface IDataGrid {
    install(vue: VueConstructor): void;
	addType(name: string, definition: ITypeDefinition): void;
	addSource(name: string, factory: (source: string) => IDataSource): void;
	addRemoteSource(name: string, factory: (baseUrl: string, request: IDataRequest) => IUrlSet, selector: (result: any) => IDataPage): void;
	addXhrHook(hook: (xhr: XMLHttpRequest) => void): void;
	setCalendar(calendar: ICalendar): void;
	setSettings(values: ISettingsArgs): void;
	setFilterComponent(typeName: string, filterComponent: string): void;
	setLanguage(lang: ILang): void;
   setLocale(locale: ILocale): void;
   locales: ILocales;
}

declare const DataGrid: IDataGrid;

export default DataGrid;
