import * as humps from "humps";

export const camelizeResponse = (data) => {
  return humps.camelizeKeys(data);
};

export const decamelizeRequest = (params) => {
  return humps.decamelizeKeys(params);
};
