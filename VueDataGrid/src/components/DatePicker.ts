import Vue from "vue";
import * as dt from "../DateFormat";

interface IThis extends Vue {
   value: Date;
   editValue: string;
   format: string;
   placeholder: string;
   editIndex: number;
}

function replacePart(text: string, index: number, value: string) {
   if(index <  0 || index > text.length-value.length)
      throw { message: "Index out of range" };
   if(index === 0)
      return value+text.substr(value.length);
   if(index === text.length-value.length)
      return text.substr(0, text.length-value.length)+value;

   return text.substr(0, index) + value + text.substr(index+value.length);
}

export default Vue.extend({
   name: "DatePicker",
   props: {
      value: { default: null },
      format: { type: String },
      placeholder: { type: String }
   },
   data(this: IThis) {
      return {
         editValue: "",
         editIndex: null
      };
   },
   render(this: IThis, h) {
      return h("input", {
         attrs: {
            type: "text",
            placeholder: this.placeholder
         },
         domProps: {
            value: this.editValue,
            selectionStart: this.editIndex,
            selectionEnd: this.editIndex
         },
         on: {
            keydown: (e: KeyboardEvent) => {
               if(e.key === "Tab")
                  return true;
               if(e.key === "Escape")
                  return true;
               if(e.key === "c" && e.ctrlKey)
                  return true;
               if(e.key === "a" && e.ctrlKey)
                  return true;
               if(/^F\d+$/gm.test(e.key))
                  return true;

               (() => {
                  const index = this.editIndex ? this.editIndex : 0;

                  const target = this.editValue
                     ? this.editValue
                     : this.placeholder;

                  const specialIndex = (() => {
                     if(e.key === "ArrowRight" && e.ctrlKey)
                        return dt.nextBounadry(index, this.format);
                     if(e.key === "ArrowLeft" && e.ctrlKey)
                        return dt.previousBoundary(index, this.format);
                     if(e.key === "ArrowLeft")
                        return Math.max(0, index-1);
                     if(e.key === "ArrowRight")
                        return Math.min(index+1, target.length-1);
                     if(e.key === "Home")
                        return 0;
                     if(e.key === "End")
                        return target.length;
                     return null;
                  })();
                  if(specialIndex !== null) {
                     this.editIndex = specialIndex;
                     return;
                  }

                  if(e.key === "Backspace" && e.ctrlKey) {
                     if(index > 0) {
                        const to = index;
                        const from = dt.previousBoundary(to, this.format);
                        this.editValue = replacePart(target, from, this.placeholder.substr(from, to-from));
                        this.editIndex = from;
                     }
                     return;
                  }

                  if(e.key === "Delete" && e.ctrlKey) {
                     if(index < target.length) {
                        const from = index;
                        const to = dt.nextBounadry(from, this.format);
                        this.editValue = replacePart(target, from, this.placeholder.substr(from, to-from));
                        this.editIndex = from;
                     }
                     return;
                  }

                  if(e.key === "Delete") {
                     if(index > 0)
                        this.editValue = replacePart(target, index, this.placeholder[index]);
                     return;
                  }

                  if(e.key === "Backspace") {
                     if(index > 0) {
                        this.editValue = replacePart(target, index-1, this.placeholder[index-1]);
                        this.editIndex = index-1;
                     }
                     return;
                  }
                  if(e.key.length > 1)
                     return;
                  const canBePlaced = dt.isMatching(e.key, index, this.format);
                  const isNumber = e.key >= "0" && e.key <= "9";
                  if(!canBePlaced && !isNumber)
                     return;

                  const newIndex = canBePlaced
                     ? index
                     : dt.nearestInputIndex(canBePlaced ? index : index+1, this.format);
                  const nextIndex = dt.nearestInputIndex(newIndex+1, this.format);
                  if(newIndex >= target.length)
                     return;
                  this.editValue = replacePart(target, newIndex, e.key);
                  this.editIndex = nextIndex;
               })();

               e.stopPropagation();
               e.preventDefault();
               return false;
            },
            focus: (e: Event) => {
               const input = e.target as HTMLInputElement;
               this.$nextTick(() => this.editIndex = input.selectionStart ? input.selectionStart : 0);
            },
            click: (e: Event) => {
               const input = e.target as HTMLInputElement;
               this.$nextTick(() => this.editIndex = input.selectionStart ? input.selectionStart : 0);
            },
            blur: (e: Event) => {
               const result = dt.tryParse(this.editValue, this.format);
               this.$emit("input", result);
               this.editValue = result ? dt.formatDate(result, this.format) : "";
            }
         }
      });
   }
});
