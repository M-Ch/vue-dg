import { IDataRequest, FilterOperator, operatorOrDefault, SortDirection, IUrlSet, IDataPage } from "./DataSource";
import { formatDate } from "./DateFormat";

function findFilter(operator: FilterOperator) {
   if(operator === FilterOperator.Equals)
      return "eq";
   if(operator === FilterOperator.GraterThanOrEqual)
      return "gte";
   if(operator === FilterOperator.GreaterThan)
      return "gt";
   if(operator === FilterOperator.LowerThan)
      return "lt";
   if(operator === FilterOperator.LowerThanOrEqual)
      return "lte";
   if(operator === FilterOperator.Contains)
      return "contains";
   if(operator === FilterOperator.NotEqals)
      return "neq";
   throw {message: `Unknown odata filter type: ${operator}` };
}

function mapDirection(direction: SortDirection) {
   if(direction === SortDirection.Asc)
      return "asc";
   if(direction === SortDirection.Desc)
      return "desc";
   throw {message: `Unknown odata sort direction: ${direction}` };
   }

export function mapData(result: any): IDataPage {
   return {
      items: result.Data,
      total: result.Total
   };
}

export function buildUrl(url: string, request: IDataRequest): IUrlSet {
   const filterGroups = request.filters.map(group => group.filters.map((filter): string | null => {
      const operator = operatorOrDefault(filter.operator);

      function formatValue(value: any) {
         if(value instanceof Date)
            return `datetime'${formatDate(value, "YYYY-MM-DDTHH-mm-ss")}'`;
         if(typeof value !== "number")
            return `'${value}'`;
         return value;
      }
      if(operator === FilterOperator.In) {
         if(!filter.value || filter.value.length === 0)
            return null;
         const clauses = filter.value.map((i: any) => `(${filter.field}~eq~${formatValue(i)})`).join("~or~");
         return filter.value.length > 1 ? `(${clauses})` : clauses;
      }
      return `${filter.field}~${findFilter(operator)}~${formatValue(filter.value)}`;
   }).filter(i => i !== null).join("~and~"));

   const filters = filterGroups.length > 1
      ? filterGroups.map(i => `(${i})`).join("~and~")
      : filterGroups.length > 0 ? filterGroups[0] : null;

   const sort = request.sorting.map(i => `${i.field}-${mapDirection(i.direction)}`).join("~");

   const vars = [
      {name: "filter", value: filters },
      {name: "sort", value: sort },
   ].filter(i => i.value).map(i => `${i.name}=${i.value}`).join("&");

   const dataUrl = `${url}?${vars}`;
   const joinSymbol = vars ? "&" : "";
   const page = request.page+1;

   return {
      dataUrl,
      pageUrl: `${dataUrl}${joinSymbol}pageSize=${request.pageSize}&page=${page}`
   };
}
