import Vue from "vue";
import * as dt from "../DateFormat";
import CalendarDisplay from "./CalendarDisplay";
import TimeDisplay from "./TimeDisplay";

interface IThis extends Vue {
   value: Date;
   editValue: string;
   format: string;
   placeholder: string;
   editIndex: number;
   popupValue: Date;
   clickListener: (e: Event) => void;
   popupVisible: boolean;
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
         editIndex: null,
         popupValue: this.value ? this.value : dt.today(),
         clickListener: null,
         popupVisible: false,
      };
   },
   mounted(this: IThis) {
      this.editValue = this.value ? dt.formatDate(this.value, this.format) : "";
      this.clickListener = (e: Event) => {
         if(e instanceof CustomEvent && e.detail && e.detail.sender === this)
            return;
         this.popupVisible = false;
         e.stopPropagation();
      };
   },
   components: {
      CalendarDisplay,
      TimeDisplay
   },
   watch: {
      popupVisible(this: IThis) {
         if(this.popupVisible) {
            const ev = new CustomEvent("dg-date-picker-close", { detail: { sender: this } });
            document.dispatchEvent(ev);
            document.addEventListener("click", this.clickListener);
            document.addEventListener("dg-date-picker-close", this.clickListener);
         } else {
            document.removeEventListener("click", this.clickListener);
            document.removeEventListener("dg-date-picker-close", this.clickListener);
         }
      }
   },
   render(this: IThis, h) {
      const textInput = h("input", {
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
            dgFocus: (e: Event) => {
               e.preventDefault();
               const input = e.target as HTMLInputElement;
               input.focus();
               this.popupVisible = false;
            },
            keydown: (e: KeyboardEvent) => {
               const input = e.target as HTMLInputElement;
               if(e.key === "Tab")
                  return true;
               if(e.key === "c" && e.ctrlKey)
                  return true;
               if(e.key === "a" && e.ctrlKey)
                  return true;
               if((e.key === "v" || e.key === "x") && e.ctrlKey) {
                  this.$nextTick(() => {
                     const index = this.editIndex;
                     this.editValue = dt.tryParse(input.value, this.format) ? input.value : "";
                     this.editIndex = Math.min(index > 0 ? index : this.editValue.length, this.editValue.length);
                  });
                  return true;
               }
               if(!this.popupVisible && e.key === "Escape") {
                  this.editValue = "";
                  input.blur();
                  e.stopPropagation();
                  return;
               }
               if(e.key === "Enter" || e.key === "Escape") {
                  this.popupVisible = false;
                  const result = dt.tryParse(this.editValue, this.format);
                  this.$emit("input", result);
                  e.stopPropagation();
                  return;
               }
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
                        return Math.min(index+1, target.length);
                     if(e.key === "Home")
                        return 0;
                     if(e.key === "End")
                        return target.length;
                     return null;
                  })();
                  if(specialIndex !== null) {
                     this.editIndex = Math.min(specialIndex, this.editValue ? this.editValue.length : 0);
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
                     if(index >= 0) {
                        this.editValue = replacePart(target, index, this.placeholder[index]);
                        this.editIndex++;
                     }
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
                  const candidate = dt.tryParse(this.editValue, this.format);
                  if(candidate)
                     this.popupValue = candidate;
               })();

               e.stopPropagation();
               e.preventDefault();
               return false;
            },
            focus: (e: Event) => {
               const input = e.target as HTMLInputElement;
               this.$nextTick(() => this.editIndex = input.selectionStart ? input.selectionStart : 0);
               this.popupVisible = true;
            },
            click: (e: Event) => {
               const input = e.target as HTMLInputElement;
               this.$nextTick(() => this.editIndex = input.selectionStart ? input.selectionStart : 0);
               this.popupVisible = true;
               e.stopPropagation();
               e.preventDefault();
            },
            blur: (e: Event) => {
               const result = dt.tryParse(this.editValue, this.format);
               this.$emit("input", result);
               this.editValue = result ? dt.formatDate(result, this.format) : "";
            }
         }
      });

      return h("div", {
         class: "dg-date-input",
         on: {
            click: (e: Event) => {
               const input = e.target as HTMLInputElement;
               this.$nextTick(() => this.editIndex = input.selectionStart ? input.selectionStart : 0);
               this.popupVisible = true;
               e.stopPropagation();
               e.preventDefault();
            }
         }
      }, [
         textInput,
         this.popupVisible
            ? (() => {
                  const tokenKind = dt.positionKind(this.editIndex, this.format);
                  if(tokenKind === null)
                     return null;
                  const isTime = tokenKind === dt.TokenKind.Hour || tokenKind === dt.TokenKind.Minute || tokenKind === dt.TokenKind.Second;
                  if(isTime)
                     return h("TimeDisplay", {
                        props: {
                           value: this.popupValue,
                           format: this.format
                        },
                        on: {
                           input: (value: Date) => {
                              this.popupValue = value;
                              this.$emit("input", this.popupValue);
                              this.editValue = dt.formatDate(this.popupValue, this.format);
                           },
                           accept: () => this.popupVisible = false
                        }
                     });

                  return h("CalendarDisplay", {
                     props: {
                        value: this.popupValue
                     },
                     on: {
                        input: (value: Date) => {
                           this.popupValue = value;
                           this.$emit("input", this.popupValue);
                           this.editValue = dt.formatDate(this.popupValue, this.format);
                           const input = this.$el.querySelector("input[type='text']") as HTMLInputElement;
                           input.focus();
                           this.popupVisible = false;
                           this.editIndex = this.editValue.length;
                        }
                     }
                  });
               })()
            : null
      ]);
   }
});
