import Vue from 'vue';

interface IThis extends Vue {
   scrollPosition: number;
   contentOffset: number;
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
   data() {
      return {
         scrollPosition: 0,
         contentOffset: 0
      };
   },
   render(this: IThis, h) {

      const renderScrollBar = () => h("div", { class: "dg-scroll-track" }, [
         h("div", {
            style: {
               "margin-top": `${this.scrollPosition}px`
            }
         })
      ]);

      return h("div", {
         class: "dg-scroll-panel",
         on: {
            wheel: (e: MouseWheelEvent) => {
               e.preventDefault();
               const root = findRoot(e.target as HTMLElement);
               const button = root.querySelector(".dg-scroll-track div") as HTMLElement;
               const content = root.querySelector(".dg-scroll-content") as HTMLElement;
               const track = button.parentElement as HTMLElement;
               const containerHeight = track.clientHeight;
               const maxOffset = containerHeight-button.clientHeight;
               const position = this.scrollPosition + Math.round(e.deltaY/10);
               this.scrollPosition = position > 0
                  ? Math.min(position, maxOffset)
                  : 0;

               const scrollLength = containerHeight-content.clientWidth;
               this.contentOffset = Math.round(scrollLength*(this.scrollPosition/maxOffset));
            }
         }
      }, [
         h("div", {
            class: "dg-scroll-content",
            style: {
               "margin-top": `-${this.contentOffset}px`
            }
         }, this.$slots.default),
         renderScrollBar()
      ]);
   },
});
