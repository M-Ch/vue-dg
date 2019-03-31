import { ICalendar, ISettingsArgs, ILang } from "../Config";

const calendar: ICalendar = {
   dateFormat: "YYYY-MM-DD",
   datePlaceholder: "yyyy-mm-dd",
   timeFormat: "HH:mm",
   timePlaceholder: "hh:mm",
   dateTimeFormat: "YYYY-MM-DD HH:mm",
   dateTimePlaceholder: "yyyy-mm-dd hh:mm",
   dayNames: [
      "N",
      "Pn",
      "Wt",
      "Śr",
      "Czw",
      "Pt",
      "So",
   ],
   monthNamesFull: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
   monthNamesShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
   weekStart: 1,
   yearFormat: "{year}",
   yearRangeFormat: "{from} - {to}",
   monthFormat: "{month}",
   monthFirst: true
};

const settings: ISettingsArgs = {
   thousandSeparator: " ",
   decimalPrecision: 2,
   decimalSeparator: ","
};

const text: ILang = {
   yes: "Tak",
   no: "Nie",
   pagerPage: "Strona",
   pagerOfPages: "z",
   firstPage: "Pierwsza strona",
   previousPage: "Poprzednia strona",
   nextPage: "Następna strona",
   lastPage: "Ostatnia strona",
   pageListItemTitle: "Strona %page%",
   filterAccept: "OK",
   filterReset: "Usuń",
   dropdownLabel: "Wybierz...",
   rangeFrom: "Od:",
   rangeTo: "Do:",
   containsValue: "Zawiera:",
   valueEquals: "Równa się:"
};

const lang = {
   settings,
   text,
   calendar
};

export default lang;