import ky from "ky";
import { getJwtToken } from "../features/auth";

const setAccessToken = async (request) => {
  const jwtToken = await getJwtToken();

  if (jwtToken) {
    request.headers.set("Authorization", `Bearer ${jwtToken}`);
  }
};

export class ApiInstance {
  constructor({ prefixUrl, skipAuth = false }) {
    this.kyInstance = ky.extend({
      prefixUrl,
      hooks: {
        beforeRequest: skipAuth ? [] : [setAccessToken],
      },
      timeout: false,
    });
  }

  parseResponse = (response) => {
    try {
      return response.json();
    } catch (error) {
      return response;
    }
  };

  get = async (path, options = {}) => {
    const response = await this.kyInstance.get(path, options);
    return this.parseResponse(response);
  };

  post = async (path, json, options = {}) => {
    const response = await this.kyInstance.post(path, { ...options, json });
    return this.parseResponse(response);
  };

  put = async (path, json, options = {}) => {
    const response = await this.kyInstance.put(path, { ...options, json });
    return this.parseResponse(response);
  };

  patch = async (path, json, options = {}) => {
    const response = await this.kyInstance.patch(path, { ...options, json });
    return this.parseResponse(response);
  };

  delete = async (path, options = {}) => {
    const response = await this.kyInstance.delete(path, options);
    return this.parseResponse(response);
  };
}
