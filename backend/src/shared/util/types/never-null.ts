export type NeverNull<T> = T extends null ? never : T;
