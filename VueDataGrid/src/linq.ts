class Enumerable<T> {

   private items: () => T[];

   constructor(items: () => T[]) {
      this.items = items;
   }

   public toList() {
      return this.items();
   }

   public select<TResult>(selector: (item: T) => TResult) {
      return new Enumerable<TResult>(() => this.items().map(selector));
   }

   public where(predicate: (item: T) => boolean) {
      return new Enumerable<T>(() => {
         const result: T[] = [];
         this.items().forEach(i => {
            if (predicate(i))
               result.push(i);
         });
         return result;
      });
   }

   public all(predicate: (item: T) => boolean) {
      for(const item of this.items()) {
         if(!predicate(item))
            return false;
      }
      return true;
   }

   public sum(selector: (item: T) => number) {
      let result = 0;
      for(const item of this.items())
         result += selector(item);
      return result;
   }

   public any(predicate: (item: T) => boolean) {
      for(const item of this.items()) {
         if(predicate(item))
            return true;
      }
      return false;
   }

   public firstOrDefault(predicate?: (item: T) => boolean) {
      const result = this.toList();
      if (result.length === 0)
         return undefined;
      if (!predicate)
         return result[0];

      return result.find(predicate);
   }

   public cast<TResult>() {
      return this as any as Enumerable<TResult>;
   }
}

export function chain<T>(items: T[]) {
   return new Enumerable(() => items);
}

export function range(start: number, count: number) {
   const result = [];
   for(let a=0;a<count;a++)
      result.push(start+a);
   return chain(result);
}
