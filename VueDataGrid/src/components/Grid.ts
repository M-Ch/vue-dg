export interface IDataGrid {
   setName: (uid: string, name: string) => void;
   destroy: (uid: string) => void;
}

export interface IDataColumn {
   uid: string;
}

export function cast<T>(data: T) {
   return data;
}
