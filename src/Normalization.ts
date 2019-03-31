import * as ds from "./DataSource";
import { range, chain } from './linq';

//sorting data can be provided as sigle string representing column name
export function normalizeSorting(candidate: any): ds.ISortField[] {
   function normalizeField(field: any): ds.ISortField {
      if(typeof field === "string")
         return {field, direction: ds.SortDirection.Asc};
      return {
         field: field.field,
         direction: field.direction ? field.direction : ds.SortDirection.Asc
      };
   }

   return Array.isArray(candidate)
      ? candidate.map(normalizeField)
      : [normalizeField(candidate)];
}

function withCheck<T>(first: T[], second: T[], check: () => boolean) {
   if(first ? !second : second) //a xor b: one is null and other one is not
      return false;
   if(!first && !second)
      return true;
   if(first.length !== second.length)
      return false;
   return check();
}

export function isSortingEqual(first: ds.ISortField[], second: ds.ISortField[]) {
   return withCheck(first, second, () => range(0, first.length)
      .all(index => first[index].direction === second[index].direction && first[index].field === second[index].field));
}

function areFilterValuesEqual(first: ds.IFilterValue[], second: ds.IFilterValue[]) {
   return withCheck(first, second, () => chain(first)
      .zip(second, (a,b) => a.field === b.field && a.operator === b.operator && a.value === b.value)
      .all(i => i));
}

function areFilterGroupsEqual(first: ds.IFilterGroup[], second: ds.IFilterGroup[]) {
   return withCheck(first, second, () => chain(first)
      .zip(second, (a,b) => areFilterValuesEqual(a.filters, b.filters))
      .all(i => i));
}

export function areFiltersEqual(first: ds.IColumnFilter[], second: ds.IColumnFilter[]) {
   return withCheck(first, second, () => {
      const firstLookup: {[key: string]: ds.IFilterGroup[]} = {};
      first.forEach(i => firstLookup[i.field] = i.groups);
      return chain(second).all(i => areFilterGroupsEqual(firstLookup[i.field], i.groups));
   });
}
