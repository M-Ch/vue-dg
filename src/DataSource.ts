import { chain } from './linq';

//promises by hand - for better compatibility ane less dependencies

export enum FilterOperator {
   Equals = "eq",
   GreaterThan = "gt",
   GraterThanOrEqual = "gte",
   LowerThan = "lt",
   LowerThanOrEqual = "lte",
   NotEqals = "neq",
   In = "in",
   Contains = "substr",
   StartsWith = "sw",
   EndsWith = "ew",
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
   page: number | null;
   pageSize: number | null;
   sorting: ISortField[];
   filters: IFilterGroup[];
   fields: IFieldInfo[];
   args: any | null;
}

export interface IDataPromise {
   resolver: (onSuccess: (data: any[], total: number, uri: string, pageUri: string) => void, onError: (error?: any) => void, onAlways: () => void) => void;
}

export class DataPromise {

   private onSuccess: (data: any[], total: number, uri: string, pageUri: string) => void = () => {};
   private onError: (error?: any) => void = () => {};
   private onAlways: () => void = () => {};
   private resolver: (onSuccess: (data: any[], total: number, uri: string, pageUri: string) => void, onError: (error?: any) => void, onAlways: () => void) => void;

   public constructor(resolver: (onSuccess: (data: any[], total: number, uri: string, pageUri: string) => void, onError: (error?: any) => void, onAlways: () => void) => void) {
      this.resolver = resolver;
   }

   public success(callback: (data: any[], total: number, uri: string, pageUri: string) => void) {
      this.onSuccess = callback;
      return this;
   }

   public error(callback: (error?: any) => void) {
      this.onError = callback;
      return this;
   }

   public always(callback: () => void) {
      this.onAlways = callback;
      return this;
   }

   public fetch() {
      this.resolver(this.onSuccess, this.onError, this.onAlways);
   }
}

export interface IDataSource {
   load: (request: IDataRequest) => IDataPromise;
   name: string;
}

const sources: {[type: string]: (source: string) => IDataSource} = {};

export function addSource(name: string, factory: (source: string) => IDataSource): void {
   sources[name] = factory;
}

export interface IUrlSet {
   dataUrl: string;
   pageUrl: string;
}

export interface IDataPage {
   items: any[];
   total: number;
}

const xhrHooks: Array<(xhr: XMLHttpRequest) => void> = [];
export function addXhrHook(hook: (xhr: XMLHttpRequest) => void) {
   if(hook)
      xhrHooks.push(hook);
}

function normalize(data: any): any {
   if(!data)
      return data;
   if(Array.isArray(data)) {
      for(const item of data)
         normalize(item);
      return data;
   }

   if(typeof data === "object") {
      for(const prop of Object.keys(data)) {
         data[prop] = normalize(data[prop]);
      }
      return data;
   }

   if(typeof data === "string") {
      const match = /^\/Date\(([0-9]+)\)\/$/.exec(data);
      return match
         ? new Date(parseInt(match[1], 10))
         : data;
   }

   return data;
}

export function addRemoteSource(name: string, factory: (baseUrl: string, request: IDataRequest) => IUrlSet, selector: (result: any) => IDataPage) {
   sources[name] = (url: string) => ({
      name,
      load: (request) => ({ resolver: (onSuccess, onError, onAlways) => {
         const urlSet = factory(url, request);
         const xhr = new XMLHttpRequest();
         xhr.onreadystatechange = () => {
            if(xhr.readyState !== XMLHttpRequest.DONE)
               return;
            onAlways();
            if(xhr.status < 200 || xhr.status >= 300) {
               onError(xhr.status);
               return;
            }

            const raw = JSON.parse(xhr.responseText);
            const result = selector ? selector(raw) : raw as IDataPage;
            onSuccess(normalize(result.items), result.total, urlSet.dataUrl, urlSet.pageUrl);
         };
         xhr.open("GET", urlSet.pageUrl);
         xhrHooks.forEach(i => i(xhr));
         xhr.send();
      } })
   });
}

export default function(source: any, sourceType: any) {
   if(!source)
      return emptySource();

   if(typeof source === "string") {
      if(!sourceType)
         throw { error: "DataGrid source type is not defined. Use 'type' property or set defaultRemoteSource through configuration." };
      const builder = sources[sourceType];
      if(builder)
         return builder(source);
      throw { error: `Not supported data source type: ${sourceType}.` };
   }
   if(Array.isArray(source)) {
      return arraySource(source);
   }

   throw { error: "Not supported data type passed as source for grid. Expected string url or array of objects." };
}

function emptySource(): IDataSource {
   return {
      name: "empty",
      load() {
         return { resolver: (onSuccess, _, onAlways) => {
            onSuccess([], 0, "no-data", "no-data");
            onAlways();
         } };
      }
   };
}

export function operatorOrDefault(operator: FilterOperator | undefined) {
   return operator !== undefined ? operator : FilterOperator.Equals;
}

function isRowMatching(row: any, filter: IFilterValue) {
   const value = row[filter.field];
   const operator = operatorOrDefault(filter.operator);
   if(operator === FilterOperator.Equals)
      return value === filter.value;
   if(operator === FilterOperator.NotEqals)
      return value !== filter.value;
   if(operator === FilterOperator.GraterThanOrEqual)
      return value >= filter.value;
   if(operator === FilterOperator.GreaterThan)
      return value > filter.value;
   if(operator === FilterOperator.LowerThan)
      return value < filter.value;
   if(operator === FilterOperator.LowerThanOrEqual)
      return value <= filter.value;
   if(operator === FilterOperator.In)
      return filter.value && filter.value.length > 0 && chain(filter.value as any[]).any(i => i === value);
   throw {message: `Unknown filter type: ${operator}` };
}

function arraySource(values: any[]): IDataSource {
   return {
      name: "array",
      load(data) {
         return { resolver: (onSuccess, _, onAlways) => {
            const isMatching = (row: any) => chain(data.filters)
               .all(group => chain(group.filters).any(filter => isRowMatching(row, filter)));

            const copy = data.filters.length > 0
               ? chain(values).where(isMatching).toList()
               : values.slice();

            if(data.sorting.length > 0)
               copy.sort((a, b) => {
                  for(const entry of data.sorting) {
                     if(a[entry.field] === b[entry.field])
                        continue;
                     let isLower = a[entry.field] < b[entry.field];
                     if(entry.direction === "desc")
                        isLower = !isLower;
                     return isLower ? -1 : 1;
                  }
                  return 0;
               });

            const result = data.page !== null && data.pageSize !== null
               ? copy.slice(data.page*data.pageSize, (data.page+1)*data.pageSize)
               : copy;
            onSuccess(result, copy.length, "local", "local");
            onAlways();
         } };
      }
   };
}
