import Vue from 'vue';

interface IThis extends Vue {
   vOffset: number;
   value: number;
}

function findRoot(item: HTMLElement) {
   while(true) {
     if(item.classList.contains("dg-scroll-panel"))
        return item;
     item = item.parentElement as HTMLElement;
   }
}

export default Vue.extend({
   name: "ScrollPanel",
   data(this: IThis) {
      return {
         vOffset: this.value,
      };
   },
   props: {
      value: { type: Number, default: 0 }
   },
   mounted(this: IThis) {
      this.vOffset = this.value;
   },
   watch: {
      value(this: IThis) {
         this.vOffset = this.value;
      }
   },
   render(this: IThis, h) {
      return h("div", {
         class: "dg-scroll-panel",
         on: {
            wheel: (e: MouseWheelEvent) => {
               e.preventDefault();
               this.vOffset += Math.round(e.deltaY/10);
               this.$emit("input", this.vOffset);
            },
         },
         directives: [{
            name: "ContentMargin",
            value: {
               value: this.vOffset,
               valueAdjust: v => {
                  this.vOffset = v;
                  this.$emit("input", v);
               } } as IContentMargin
            }, {
               name: "BarMargin",
               value: this.vOffset
            }
         ]
      }, [
         h("div", {
            class: "dg-scroll-content",
         }, this.$slots.default),
         h("div", { class: "dg-scroll-track" }, [
            h("div", {
               on: {
                  mousedown: (e: MouseEvent) => {
                     if(e.button !== 0)
                        return;
                     e.preventDefault();
                     const root = findRoot(e.target as HTMLElement);
                     const content = root.querySelector(".dg-scroll-content") as HTMLElement;
                     const bar = root.querySelector(".dg-scroll-track div") as HTMLElement;
                     const containerHeight = root.clientHeight;
                     const maxContentOffset = content.clientHeight - containerHeight;
                     const startPos = e.pageY;
                     const startOffset = this.vOffset;
                     const maxBarOffset = containerHeight - bar.clientHeight;

                     const moveHandler = (ev: MouseEvent) => {
                        const delta = ev.pageY-startPos;
                        const percent = delta/maxBarOffset;
                        console.log(percent);
                        this.vOffset = startOffset + Math.round(percent*maxContentOffset);
                     };

                     let endHandler: (ev: MouseEvent) => void;
                     endHandler = (ev: MouseEvent) => {
                        if(ev.button !== 0)
                           return;
                        e.preventDefault();
                        document.body.removeEventListener("mousemove", moveHandler);
                        document.body.removeEventListener("mouseup", endHandler);
                     };
                     document.body.addEventListener("mousemove", moveHandler);
                     document.body.addEventListener("mouseup", endHandler);
                  }
               }
            })
         ])
      ]);
   },
   directives: {
      BarMargin(el, binding) {
         const contentOffset = binding.value as number;
         const content = el.querySelector(".dg-scroll-content") as HTMLElement;
         const bar = el.querySelector(".dg-scroll-track div") as HTMLElement;
         const containerHeight = el.clientHeight;
         const maxContentOffset = content.clientHeight - containerHeight;
         const percent = contentOffset/maxContentOffset;
         const maxBarOffset = containerHeight - bar.clientHeight;
         const offset = Math.round(maxBarOffset*percent);
         bar.style.marginTop = `${offset}px`;
      },
      ContentMargin(el, binding) {
         const value = binding.value as IContentMargin;
         const containerHeight = el.clientHeight;
         const content = el.querySelector(".dg-scroll-content") as HTMLElement;
         const maxOffset = content.clientHeight - containerHeight;
         const offset = Math.max(Math.min(maxOffset, value.value), 0);
         if(offset !== value.value)
            value.valueAdjust(offset);
         content.style.marginTop = `-${offset}px`;
      }
   }
});

interface IContentMargin {
   value: number;
   valueAdjust: (value: number) => void;
}
