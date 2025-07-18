export const tryParse = (stringObj: string): Record<string, any> => {
  try {
    const obj = JSON.parse(stringObj);
    return obj;
  } catch (error) {
    return {}
  }
}

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}