export const objectToQueryString = (
  params: Record<string, any>,
  options?: { arrayValueWillBeJoined?: boolean },
): string => {
  const buildQuery = (obj: Record<string, any>, prefix = ""): string => {
    return (
      Object.entries(obj)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => !!value)
        .flatMap(([key, value]) => {
          const encodedKey = encodeURIComponent(
            prefix ? `${prefix}[${key}]` : key,
          );
          if (value instanceof Object && !Array.isArray(value)) {
            return buildQuery(value, encodedKey);
          }
          if (Array.isArray(value)) {
            if (options?.arrayValueWillBeJoined) {
              return `${encodedKey}=${value.join(",")}`;
            }
            return value.map(
              (val) => `${encodedKey}=${encodeURIComponent(val)}`,
            );
          }
          return `${encodedKey}=${encodeURIComponent(value)}`;
        })
        .join("&")
    );
  };

  const queryString = buildQuery(params);
  return queryString ? `?${queryString}` : "";
};

export const objectToFormData = (
  obj: Record<string, any>,
  formData = new FormData(),
  parentKey = "",
) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof Object && !(value instanceof File)) {
        objectToFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value);
      }
    }
  }
  return formData;
};
