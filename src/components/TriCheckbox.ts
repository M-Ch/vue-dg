import Vue from "vue";

interface IThis extends Vue {
   value: boolean | undefined;
}

export default Vue.extend({
   name: "TriCheckbox",
   props: {
      value: { type: Boolean, default: false },
   },
   render(this: IThis, h) {
      return h("input", {
         attrs: {
            type: "checkbox",
            checked: !!this.value,
         },
         domProps: {
            indeterminate: this.value === null,
            checked: !!this.value,
         },
         on: {
            input: (e: Event) => this.$emit("input", (e.target as HTMLInputElement).checked),
            click: (e: Event) => {
               const target = e.target as HTMLInputElement;
               e.preventDefault();
               e.stopPropagation();
               const value = this.value === null ? false : !this.value;
               //values must be outside the callback itself. Otherwise values will not be applied to an html element
               setTimeout(() => {
                  target.checked = value;
                  target.indeterminate = false;
               });
               this.$emit("input", value);
               return false;
            }
         }
      });
   },
});
