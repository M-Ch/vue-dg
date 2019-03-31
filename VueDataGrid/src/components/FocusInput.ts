export default function() {
   return {
      inserted(el: HTMLElement) {
         const target = el.tagName.toLowerCase() === "input"
            ? el
            : el.querySelector("input");
         if(target)
            target.focus();
       }
   };
}
