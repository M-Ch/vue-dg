import { formatDate } from "./DateFormat";

interface ITypeConfig {
   name: string;
   formatter: (value: any) => string;
}

export interface ILang {
   yes: string;
   no: string;
   dateFormat: string;
   dateTimeFormat: string;
}

const types: {[key: string]: ITypeConfig } = {};
let i18n: ILang = {
   yes: "Yes",
   no: "No",
   dateFormat: "YYYY-MM-DD",
   dateTimeFormat: "YYYY-MM-DD HH:mm"
};

export function setLanguage(lang: ILang) {
   i18n = lang;
}

export function addType(name: string, formatter: (value: any) => string) {
   types[name] = {
      name,
      formatter
   };
}

export function getFormatter(typeName: string | undefined | null): (value: any) => string {
   if(!typeName || !types[typeName])
      return i => i !== undefined || i !== null ? ""+i : "";
   return types[typeName].formatter;
}

type LangKey = keyof ILang;
export function localize(key: LangKey) {
   return i18n[key];
}

addType("bool", value => {
   if(value === undefined || value === null)
      return "";
   return !!value ? i18n.yes : i18n.no;
});

addType("date", value => {
   if(!value)
      return "";
   const date = value instanceof Date
      ? value
      : new Date(value);
   return formatDate(date, i18n.dateFormat);
});

addType("dateTime", value => {
   if(!value)
      return "";
   const date = value instanceof Date
      ? value
      : new Date(value);
   return formatDate(date, i18n.dateTimeFormat);
});