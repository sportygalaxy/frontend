/**
 * Extract values from route params
 * @template {{[x: string]: any}} T
 * @param {URLSearchParams} searchParams
 * @param {T} params
 * @returns {T}
 */
export function urlSearchParamsExtractor<T>(
  searchParams: URLSearchParams,
  params: any
): any {
  if (searchParams && params) {
    const result = {} as any;

    const keys = Object.keys(params);
    keys.forEach((key) => {
      const value = searchParams.get(key);
      result[key] = value || params[key];
    });

    return result;
  }
  return params;
}
