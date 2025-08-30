import axios, { AxiosHeaders } from "axios";
import { v4 as uuid } from "uuid";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15_000,
});

api.interceptors.request.use((config) => {
  const headers = (config.headers ?? new AxiosHeaders()) as AxiosHeaders;

  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (!headers.has("X-Correlation-ID")) headers.set("X-Correlation-ID", uuid());

  config.headers = headers;
  return config;
});

api.interceptors.response.use(
  (res) => {
    if (import.meta.env.DEV) {
      const cid = res.headers["x-correlation-id"];
      if (cid) console.debug("Correlation-ID:", cid, res.config.url);
    }
    return res;
  },
  (err) => Promise.reject(err)
);

export default api;
