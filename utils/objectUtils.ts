export function getKeyValue(obj: { [key: string]: string }) {
  const entries = Object.entries(obj);

  if (entries.length === 0) return null;

  const [key, value] = entries[0];
  return { key, value };
}

export const countKeyValuePairs = (obj: Record<string, any>): number => {
  return Object.keys(obj).length;
};

export const deepReplace = (
  obj: Record<string, any> | any,
  path: string[],
  value: any
): Record<string, any> => {
  if (path.length === 0) {
    return obj; // If the path is empty, return the original object (no changes to be made)
  }

  const [key, ...remainingPath] = path;

  // Base case: if there are no more keys in the path, set the value for the current key
  if (remainingPath.length === 0) {
    return {
      ...obj,
      [key]: value,
    };
  }

  // Check if the object has the current key and traverse it; if not, use an empty object as default
  return {
    ...obj,
    [key]: deepReplace(obj[key] ?? {}, remainingPath, value),
  };
};

/**
 *
 * @param existingObj
 * @param newObj
 * @returns overrides any existing property
 */
export function mergeObjects<T extends object, U extends object>(
  existingObj: T,
  newObj: U
): T & U {
  const result: T & Partial<U> = { ...existingObj };

  Object.keys(newObj).forEach((key) => {
    (result as any)[key] = newObj[key as keyof U]; // Override any existing keys with values from newObj
  });

  return result as T & U;
}
