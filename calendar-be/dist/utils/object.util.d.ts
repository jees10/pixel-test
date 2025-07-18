export declare const tryParse: (stringObj: string) => Record<string, any>;
export declare const omit: <T extends object, K extends keyof T>(obj: T, keys: K[]) => Omit<T, K>;
