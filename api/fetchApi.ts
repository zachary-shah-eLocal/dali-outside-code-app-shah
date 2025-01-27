import { getJwtToken } from "../features/auth";

function makeQueryParams(
  parameterObject: { [s: string]: unknown } | ArrayLike<unknown>
) {
  if (!parameterObject) {
    return "";
  }

  const params = new URLSearchParams();

  Object.entries(parameterObject).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value) => params.append(key, value.toString()));
    } else if (value !== null && value !== "" && value !== undefined) {
      params.append(key, value.toString());
    }
  });

  return `?${params.toString()}`;
}

function createFetch(DOMAIN: any) {
  return async function fetchApi(
    path: any,
    options: any = {},
    expectedResponseType?: any
  ) {
    const { queryParams, ...restOptions } = options;

    options = restOptions;

    const params = makeQueryParams(queryParams);
    const url = `${DOMAIN}${path}${params}`;

    const jwtToken = await getJwtToken();

    options.headers = jwtToken
      ? {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        }
      : {};

    const response = await fetch(url, options);

    if (response.status === 204) {
      return "ok";
    }

    if (expectedResponseType) {
      return response;
    }

    const data = await response.json();

    if (!response.ok) {
      if (data) {
        data.status = response.status;
        throw data;
      }

      let error = "Network response was not ok";

      if (data.error_message) {
        error = data.error_message;
      }

      if (data.errors) {
        error = data.errors;
      }

      error = response.statusText;

      throw new Error(error);
    }

    return data;
  };
}
export default createFetch;
