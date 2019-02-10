import { formatDate } from "./DateFormat";

interface ITypeConfig {
   name: string;
   formatter?: (value: any, options: any) => string;
   filterComponent?: string;
}

export interface ILang {
   yes: string;
   no: string;
   dateFormat: string;
   dateTimeFormat: string;
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
}

const types: {[key: string]: ITypeConfig } = {};
let i18n: ILang = {
   yes: "Yes",
   no: "No",
   dateFormat: "YYYY-MM-DD",
   dateTimeFormat: "YYYY-MM-DD HH:mm",
   pagerPage: "Page",
   pagerOfPages: "of",
   firstPage: "First page",
   previousPage: "Previous page",
   nextPage: "Next page",
   lastPage: "Last page",
   pageListItemTitle: "Page %page%",
   filterAccept: "Accept",
   filterReset: "Reset",
   dropdownLabel: "Select...",
};

export interface ISettings {
   idField: string;
}

export interface ISettingsArgs {
   idField?: string;
}

const settings: ISettings = {
   idField: "id"
};

export function setup(values: ISettingsArgs) {
   if(values.idField !== undefined)
      settings.idField = values.idField;
}

export function getSettings() {
   return settings;
}

export function setLanguage(lang: ILang) {
   i18n = lang;
}

export interface ITypeDefinition {
   formatter?: (value: any, options: any) => string;
   filterComponent?: string;
}

export function addType(name: string, definition: ITypeDefinition) {
   types[name] = {
      name,
      formatter: definition.formatter,
      filterComponent: definition.filterComponent
   };
}

export function getFormatter(typeName: string | undefined | null): (value: any, options: any) => string {
   function defaultFormatter(value: any) {
      return value !== undefined || value !== null ? ""+value : "";
   }
   if(!typeName || !types[typeName])
      return defaultFormatter;
   const candidate = types[typeName].formatter;
   return candidate ? candidate : defaultFormatter;
}

export function getFilterComponent(typeName: string | undefined | null) {
   if(!typeName || !types[typeName])
      return null;
   const candidate = types[typeName].filterComponent;
   return candidate ? candidate : null;
}

type LangKey = keyof ILang;
export function localize(key: LangKey) {
   return i18n[key];
}

export function setFilterComponent(typeName: string, filterComponent: string) {
   const entry = types[typeName];
   if(entry)
      entry.filterComponent = filterComponent;
}

addType("bool", {
   formatter: value => {
      if(value === undefined || value === null)
         return "";
      return !!value ? i18n.yes : i18n.no;
   },
   filterComponent: "BoolFilter"
});

addType("date", {
   formatter: (value, options) => {
      if(!value)
         return "";
      const date = value instanceof Date
         ? value
         : new Date(value);
      return formatDate(date, typeof options === "string" ? options : i18n.dateFormat);
   }
});

addType("dateTime", {
   formatter: (value, options) => {
      if(!value)
         return "";
      const date = value instanceof Date
         ? value
         : new Date(value);
      return formatDate(date, typeof options === "string" ? options : i18n.dateTimeFormat);
   }
});