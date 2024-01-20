export const removeEmptyProperty = (data: Object) =>
  Object.fromEntries(Object.entries(data).filter(([_, propVal]) => propVal));
