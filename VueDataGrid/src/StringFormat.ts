//no we are not using library for this...
export function leftPad(text: string, length: number, placeholder: string) {
   let result = text ? text : "";
   while(result.length < length)
      result = placeholder+result;
   return result.length > length ? result.substr(0, length) : result;
}
