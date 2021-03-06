import { chain } from "./linq";
import { leftPad } from "@/StringFormat";
//basic date time formatting

interface IDatePart {
   token: string;
   formatter: (date: Date) => string;
   setter: (target: IDate, value: number) => void;
   kind: TokenKind;
}

export enum TokenKind {
   Year,
   Month,
   Day,
   Hour,
   Minute,
   Second
}

const dateParts: IDatePart[] = [
   {token: "YYYY", formatter: d => ""+d.getFullYear(), setter: (t,v) => t.year = v, kind: TokenKind.Year },
   {token: "YY", formatter: d => (""+d.getFullYear()).substr(2), setter: (t,v) => t.year = v, kind: TokenKind.Year }, //fix this after 9999 year ;)
   {token: "MM", formatter: d => leftPad(""+(d.getMonth()+1), 2, "0"), setter: (t,v) => t.month = v-1, kind: TokenKind.Month },
   {token: "DD", formatter: d => leftPad(""+d.getDate(), 2, "0"), setter: (t,v) => t.day = v, kind: TokenKind.Day },
   {token: "HH", formatter: d => leftPad(""+d.getHours(), 2, "0"), setter: (t,v) => t.hour = v, kind: TokenKind.Hour },
   {token: "mm", formatter: d => leftPad(""+d.getMinutes(), 2, "0"), setter: (t,v) => t.minute = v, kind: TokenKind.Minute },
   {token: "ss", formatter: d => leftPad(""+d.getSeconds(), 2, "0"), setter: (t,v) => t.second = v, kind: TokenKind.Second },
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

export function today() {
   const value = new Date();
   return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

export function findLayout(format: string) {
   return tokenize(format)
      .map(i => (i.type === TokenType.DatePart ? i.part.kind : undefined) as TokenKind)
      .filter(i => i !== undefined);
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

export function positionKind(position: number, format: string) {
   let start = 0;
   let kind: TokenKind | null = null;
   for(const part of tokenize(format)) {
      const value = part.type === TokenType.Const
         ? part.value
         : part.part.token;
      if(part.type === TokenType.DatePart)
         kind = part.part.kind;
      if(position >= start + value.length) {
         start += value.length;
         continue;
      }
      return kind;
   }
   return kind;
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

export function nearestInputIndex(position: number,format: string) {
   let start = 0;
   for(const part of tokenize(format)) {
      const value = part.type === TokenType.Const
         ? part.value
         : part.part.token;
      if(part.type === TokenType.Const || position >= start + value.length) {
         start += value.length;
         continue;
      }
      return Math.max(start, position);
   }
   return format.length;
}

export function nextBounadry(position: number, format: string) {
   let start = 0;
   if(position >= format.length-1)
      return format.length;
   for(const part of tokenize(format)) {
      if(part.type === TokenType.Const) {
         start += part.value.length;
         continue;
      }
      const length = part.part.token.length;
      if(position >= start+length) {
         start += length;
         continue;
      }
      if(position < start)
         return start;
      return start+length;
   }
   return format.length-1;
}

export function previousBoundary(position: number, format: string) {
   let end = format.length-1;
   const tokens = tokenize(format);
   for(let a=tokens.length-1;a>=0;a--) {
      const part = tokens[a];
      if(part.type === TokenType.Const) {
         end -= part.value.length;
         continue;
      }

      const length = part.part.token.length;
      if(position <= end-length+1) {
         end -= length;
         continue;
      }

      if(position > end+1)
         return end+1;

      return end-length+1;
   }

   return 0;
}

interface IDate {
   year: number;
   month: number;
   day: number;
   hour: number;
   minute: number;
   second: number;
}

export function tryParse(value: string, format: string): Date | null {
   if(!value)
      return null;

   const result: IDate = {
      day: 0,
      hour: 0,
      minute: 0,
      month: 0,
      second: 0,
      year: 0
   };
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
      value = value.substr(datePart.token.length);
      datePart.setter(result, parseInt(tokenValue, 10));
   }

   return value.length === 0
      ? new Date(result.year, result.month, result.day, result.hour, result.minute, result.second, 0) 
      : null;
}
