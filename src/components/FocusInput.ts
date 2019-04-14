export default function() {
   return {
      inserted(el: HTMLElement) {
         const target = el.tagName.toLowerCase() === "input"
            ? el
            : el.querySelector("input");
         if(!target)
            return;
         const ev = new Event("dgFocus", { cancelable: true });
         if(target.dispatchEvent(ev) !== false)
            target.focus();
      }
   };
}
