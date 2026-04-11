// src/api/api.helper.ts

export const getContentType = () => {
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
}

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === "object"
      ? message[0]
      : message
    : error.message;
};
