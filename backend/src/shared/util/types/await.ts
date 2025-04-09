export type Await<T> = T extends Promise<infer K> ? K : never;
