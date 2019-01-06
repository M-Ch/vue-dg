import Vue from "vue";

interface IThis extends Vue {
   value: number;
   emitValue: (buffer: string) => void;
}

export default Vue.extend({
   name: "NumericInput",
   props: {
      value: { type: Number, default: null }
   },
   data(this: IThis) {
      return {
         buffer: this.value !== null && this.value !== undefined ? ""+this.value : "",
      };
   },
   methods: {
      emitValue(this: IThis, buffer: string) {
         const newValue = buffer || buffer === "0" ? parseInt(buffer, 10) : null;
         if(newValue !== this.value)
            this.$emit("input", parseInt(buffer, 10));
      }
   } as any,
   render(this: IThis, h) {
      return h("input", {
         attrs: { type: "text" },
         domProps: { value: ""+this.value },
         on: {
            keydown: (e: KeyboardEvent) => {
               if(e.key >= "0" && e.key <= "9")
                  return true;
               if(e.key === "Backspace")
                  return true;
               if(e.key === "Enter")
                  this.emitValue((e.target as HTMLInputElement).value);
               if(e.key === "Tab")
                  return true;
               if(e.key === "Escape") {
                  const target = e.target as HTMLInputElement;
                  this.emitValue(""+this.value);
                  target.value = ""+this.value;
                  (e.target as HTMLInputElement).blur();
               }

               e.stopPropagation();
               e.preventDefault();
               return false;
            },
            blur: (e: Event) => this.emitValue((e.target as HTMLInputElement).value)
         }
      });
   }
});
