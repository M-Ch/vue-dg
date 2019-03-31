import Vue from "vue";

interface IThis extends Vue {
   value: boolean;
   label: string;
}

export default Vue.extend({
   name: "Checkbox",
   props: {
      value: { type: Boolean, default: false },
      label: { type: String },
   },
   render(this: IThis, h) {
      return h("label", { }, [
         h("input", {
            attrs: {
               type: "checkbox",
            },
            domProps: {
               checked: !!this.value
            },
            on: {
               input: (e: Event) => this.$emit("input", (e.target as HTMLInputElement).checked)
            }
         }),
         this.label
      ]);
   },
});
