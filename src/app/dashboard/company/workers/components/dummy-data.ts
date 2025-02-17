export interface Worker {
    id: number;
    name: string;
    role: string;
    store: string;
    email: string;
  }
  
  export const dummyWorkers: Worker[] = [
    { id: 1, name: "Alice Johnson", role: "Manager", store: "Store A", email: "alice@store.com" },
    { id: 2, name: "Bob Smith", role: "Cashier", store: "Store B", email: "bob@store.com" },
    { id: 3, name: "Charlie Davis", role: "Stock Manager", store: "Store A", email: "charlie@store.com" },
  ];
  