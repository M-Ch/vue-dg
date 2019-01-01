import { chain } from "./linq";
//basic date time formatting

interface IDatePart {
   token: string;
   formatter: (date: Date) => string;
}

function leftPad(text: string, length: number, placeholder: string) { //no we are not using library for this...
   let result = text ? text : "";
   while(result.length < length)
      result = placeholder+result;
   return result.length > length ? result.substr(0, length) : result;
}

const dateParts: IDatePart[] = [
   {token: "YYYY", formatter: d => ""+d.getFullYear() },
   {token: "YY", formatter: d => (""+d.getFullYear()).substr(2) }, //fix this after 9999 year ;)
   {token: "M", formatter: d => ""+(d.getMonth()+1) },
   {token: "MM", formatter: d => leftPad(""+(d.getMonth()+1), 2, "0") },
   {token: "D", formatter: d => ""+d.getDate() },
   {token: "DD", formatter: d => leftPad(""+d.getDate(), 2, "0") },
   {token: "H", formatter: d => ""+d.getHours() },
   {token: "HH", formatter: d => leftPad(""+d.getHours(), 2, "0") },
   {token: "m", formatter: d => ""+d.getMinutes() },
   {token: "mm", formatter: d => leftPad(""+d.getMinutes(), 2, "0") },
   {token: "s", formatter: d => ""+d.getSeconds() },
   {token: "ss", formatter: d => leftPad(""+d.getSeconds(), 2, "0") },
];

const dateLookup: {[letter: string]: IDatePart[]} = {};
chain(dateParts)
   .groupBy(i => i.token[0])
   .toList()
   .forEach(i => dateLookup[i.key] = i.values.sort((a,b) => a.token.length < b.token.length ? 1 : -1));

export function formatDate(date: Date, format: string): string {
   let result = "";
   while(format) {
      const entry = dateLookup[format[0]];
      const match = entry
         ? entry.find(i => format.startsWith(i.token))
         : undefined;

      if(!match) {
         result += format[0];
         format = format.substr(1);
         continue;
      }

      result += match.formatter(date);
      format = format.substr(match.token.length);
   }
   return result;
}
