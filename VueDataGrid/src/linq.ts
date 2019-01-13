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

   public take(count: number) {
      return new Enumerable<T>(() => {
         const result: T[] = [];
         const items = this.items();
         for(let a=0; a< count && items.length; a++)
            result.push(items[a]);
         return result;
      });
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

   public selectMany<TResult>(selector: (item: T) => TResult[]) {
      return new Enumerable<TResult>(() => {
         const result: TResult[] = [];
         this.items().forEach(i => {
            selector(i).forEach(j => result.push(j));
         });
         return result;
      });
   }

   public groupBy(keySelector: (item: T) => string) {
    return new Enumerable<IGroup<T>>(() => {
       const result: Array<IGroup<T>> = [];
       const lookup: {[key: string]: T[]} = {};
       this.items().forEach(i => {
          const key = keySelector(i);
          if(!lookup[key])
            lookup[key] = [i];
         else
            lookup[key].push(i);
       });

       for(const key of Object.keys(lookup)) {
          result.push({
             key,
             values: lookup[key]
          });
       }
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

   public zip<TSecond, TResult>(values: TSecond[], selector: (first: T, second: TSecond) => TResult) {
      return new Enumerable<TResult>(() => {
         const result: TResult[] = [];
         const items = this.items();
         for(let a=0;a<items.length;a++)
            result.push(selector(items[a], values[a]));
         return result;
      });
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

export interface IGroup<TValue> {
   key: string;
   values: TValue[];
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
