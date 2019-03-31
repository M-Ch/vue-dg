import Vue from "vue";

interface IThis extends Vue {
   value: number;
   separator: string;
   float: boolean;
   emitValue: (buffer: string) => number;
   formatValue: (value: number) => string;
}

const validKeys: {[key: string]: boolean} = {};
["Backspace", "Tab", "ArrowLeft", "ArrowRight"].forEach(i => validKeys[i] = true);

export default Vue.extend({
   name: "NumericInput",
   props: {
      value: { type: Number, default: null },
      float: { type: Boolean, default: false },
      separator: { type: String, default: "." }
   },
   data(this: IThis) {
      return {
         buffer: this.value !== null && this.value !== undefined ? ""+this.value : "",
      };
   },
   methods: {
      formatValue(this: IThis, value: number) {
         return value ? (""+value).replace(".", this.separator) : "";
      },
      emitValue(this: IThis, buffer: string) {
         if(buffer.endsWith(this.separator))
            buffer = buffer+"0";
         if(buffer.startsWith(this.separator))
            buffer = "0"+buffer;
         buffer = buffer.replace(this.separator, ".");
         const newValue = (() => {
            if(buffer === "0")
               return 0;
            if(!buffer)
               return null;
            if(this.float)
               return parseFloat(buffer);
            return parseInt(buffer, 10);
         })();

         if(newValue !== this.value)
            this.$emit("input", newValue);
         return newValue;
      }
   } as any,
   render(this: IThis, h) {
      return h("input", {
         attrs: { type: "text" },
         domProps: { value: this.formatValue(this.value) },
         on: {
            keydown: (e: KeyboardEvent) => {
               const target = e.target as HTMLInputElement;
               if(e.ctrlKey)
                  return true;
               if(e.key >= "0" && e.key <= "9")
                  return true;
               if(/F[0-9]{1,2}/.test(e.key))
                  return true;
               if(e.key === "-" && !target.value)
                  return true;
               if(e.key === this.separator && this.float)
                  return target.value.indexOf(this.separator) === -1;
               if(validKeys[e.key])
                  return true;
               if(e.key === "Enter") {
                  this.emitValue(target.value);
                  return true;
               }
               if(e.key === "Escape") {
                  this.emitValue(""+this.value);
                  target.value = ""+this.value;
                  (e.target as HTMLInputElement).blur();
               }

               e.stopPropagation();
               e.preventDefault();
               return false;
            },
            blur: (e: Event) => {
               const target = e.target as HTMLInputElement;
               const newValue = this.emitValue(target.value);
               target.value = this.formatValue(newValue);
            }
         }
      });
   }
});
