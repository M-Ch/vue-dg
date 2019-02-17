import { chain } from "./linq";
//basic date time formatting

interface IDatePart {
   token: string;
   formatter: (date: Date) => string;
   setter: (target: Date, value: number) => void;
}

function leftPad(text: string, length: number, placeholder: string) { //no we are not using library for this...
   let result = text ? text : "";
   while(result.length < length)
      result = placeholder+result;
   return result.length > length ? result.substr(0, length) : result;
}

const dateParts: IDatePart[] = [
   {token: "YYYY", formatter: d => ""+d.getFullYear(), setter: (t,v) => t.setFullYear(v) },
   {token: "YY", formatter: d => (""+d.getFullYear()).substr(2), setter: (t,v) => t.setFullYear(v) }, //fix this after 9999 year ;)
   {token: "M", formatter: d => ""+(d.getMonth()+1), setter: (t,v) => t.setMonth(v-1) },
   {token: "MM", formatter: d => leftPad(""+(d.getMonth()+1), 2, "0"), setter: (t,v) => t.setMonth(v-1) },
   {token: "D", formatter: d => ""+d.getDate(), setter: (t,v) => t.setDate(v) },
   {token: "DD", formatter: d => leftPad(""+d.getDate(), 2, "0"), setter: (t,v) => t.setDate(v) },
   {token: "H", formatter: d => ""+d.getHours(), setter: (t,v) => t.setHours(v) },
   {token: "HH", formatter: d => leftPad(""+d.getHours(), 2, "0"), setter: (t,v) => t.setHours(v) },
   {token: "m", formatter: d => ""+d.getMinutes(), setter: (t,v) => t.setMinutes(v) },
   {token: "mm", formatter: d => leftPad(""+d.getMinutes(), 2, "0"), setter: (t,v) => t.setMinutes(v) },
   {token: "s", formatter: d => ""+d.getSeconds(), setter: (t,v) => t.setSeconds(v) },
   {token: "ss", formatter: d => leftPad(""+d.getSeconds(), 2, "0"), setter: (t,v) => t.setSeconds(v) },
];

enum TokenType {
   Const,
   DatePart
}

type IToken = {
   type: TokenType.Const;
   value: string;
} | {
   type: TokenType.DatePart,
   part: IDatePart
};

function tokenize(format: string) {
   const result: IToken[] = [];
   while(format) {
      const entry = dateLookup[format[0]];
      const match = entry
         ? entry.find(i => format.startsWith(i.token))
         : undefined;

      if(!match) {
         const last = result.length > 0 ? result[result.length-1] : null;
         if(last != null && last.type === TokenType.Const)
            last.value+= format[0];
         else
            result.push({
               type: TokenType.Const,
               value: format[0]
            });
         format = format.substr(1);
         continue;
      }

      result.push({
         type: TokenType.DatePart,
         part: match
      });
      format = format.substr(match.token.length);
   }
   return result;
}

const dateLookup: {[letter: string]: IDatePart[]} = {};
chain(dateParts)
   .groupBy(i => i.token[0])
   .toList()
   .forEach(i => dateLookup[i.key] = i.values.sort((a,b) => a.token.length < b.token.length ? 1 : -1));

export function formatDate(date: Date, format: string): string {
   return tokenize(format)
      .map(i => i.type === TokenType.DatePart ? i.part.formatter(date) : i.value)
      .join("");
}

//checks if specified char value can be placed at given position when using specified format
export function isMatching(input: string, position: number, format: string) {
   let start = 0;
   for(const part of tokenize(format)) {
      const value = part.type === TokenType.Const
         ? part.value
         : part.part.token;
      if(position >= start + value.length) {
         start += value.length;
         continue;
      }

      return part.type === TokenType.Const
         ? part.value[position-start] === input
         : /^\d+$/gm.test(input);
   }
   return false;
}

export function tryParse(value: string, format: string): Date | null {
   if(!value)
      return null;

   const result = new Date(0,0,0);
   const parts = tokenize(format);
   for(const part of parts) {
      if(!value)
         return null;
      if(part.type === TokenType.Const) {
         if(!value.startsWith(part.value))
            return null;
         value = value.substr(part.value.length);
         continue;
      }

      const datePart = part.part;
      const tokenValue = value.substr(0, datePart.token.length);
      if(!/^\d+$/gm.test(tokenValue))
         return null;
      datePart.setter(result, parseInt(tokenValue, 10));
   }

   return value.length === 0 ? result : null;
}
