import { formatDate } from "./DateFormat";
import { VNode, CreateElement } from 'vue';

interface ITypeConfig {
   name: string;
   formatter?: (value: any, options: any, h: CreateElement) => string | VNode;
   filterComponent?: string;
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
}

const types: {[key: string]: ITypeConfig } = {};
let i18n: ILang = {
   yes: "Yes",
   no: "No",
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
   rangeFrom: "From:",
   rangeTo: "To:",
};

export interface ICalendar {
   dateFormat: string;
   datePlaceholder: string;
   dateTimeFormat: string;
   dateTimePlaceholder: string;
   timeFormat: string;
   timePlaceholder: string;
   weekStart: number;
   dayNames: string[];
   monthNamesFull: string[];
   monthNamesShort: string[];
   yearFormat: string;
   yearRangeFormat: string;
   monthFormat: string;
   monthFirst: boolean;
}

const calendarSettings: ICalendar = {
   dateFormat: "YYYY-MM-DD",
   datePlaceholder: "yyyy-mm-dd",
   timeFormat: "HH:mm",
   timePlaceholder: "hh:mm",
   dateTimeFormat: "YYYY-MM-DD HH:mm",
   dateTimePlaceholder: "yyyy-mm-dd hh:mm",
   dayNames: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
   ],
   monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
   monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
   weekStart: 1,
   yearFormat: "{year}",
   yearRangeFormat: "{from} - {to}",
   monthFormat: "{month}",
   monthFirst: true
};

export function getCalendar() {
   return calendarSettings;
}

export function setCalendar(calendar: any | ICalendar) {
   const target = calendarSettings as any;
   for(const prop in Object.getOwnPropertyNames(calendar)) {
      if(target[prop] !== undefined)
         target[prop] = calendar[prop];
   }
}

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
   formatter?: (value: any, options: any, h: CreateElement) => string | VNode;
   filterComponent?: string;
}

export function addType(name: string, definition: ITypeDefinition) {
   types[name] = {
      name,
      formatter: definition.formatter,
      filterComponent: definition.filterComponent
   };
}

export function getFormatter(typeName: string | undefined | null): (value: any, options: any, h: CreateElement) => string | VNode {
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
      return formatDate(date, typeof options === "string" ? options : calendarSettings.dateFormat);
   },
   filterComponent: "DateFilter"
});

addType("dateTime", {
   formatter: (value, options) => {
      if(!value)
         return "";
      const date = value instanceof Date
         ? value
         : new Date(value);
      return formatDate(date, typeof options === "string" ? options : calendarSettings.dateTimeFormat);
   }
});
