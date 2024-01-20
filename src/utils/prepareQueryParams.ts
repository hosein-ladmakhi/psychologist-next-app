export const prepareQueryParams = (data: Object) => {
  const transformedObject = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return '?' + transformedObject;
};
