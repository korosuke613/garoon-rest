import FormData from "form-data";
export interface HttpClient {
  // eslint-disable-next-line @typescript-eslint/ban-types
  get: <T extends object>(path: string, params: object) => Promise<T>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  getData: (path: string, params: object) => Promise<ArrayBuffer>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  post: <T extends object>(path: string, params: object) => Promise<T>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  postData: <T extends object>(path: string, params: FormData) => Promise<T>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  put: <T extends object>(path: string, params: object) => Promise<T>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  delete: <T extends object>(path: string, params: object) => Promise<T>;
}

export type ErrorResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
};

export type HttpMethod = "get" | "post" | "put" | "delete";
export type Params = { [key: string]: unknown };

export type ProxyConfig = {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
};

export interface HttpClientError<T = ErrorResponse> extends Error {
  response?: T;
}
export type ErrorResponseHandler = (error: HttpClientError) => void;

export type RequestConfig = {
  method: HttpMethod;
  url: string;
  headers: any;
  httpsAgent?: any;
  data?: any;
  proxy?: ProxyConfig;
};

export interface RequestConfigBuilder {
  build: (
    method: HttpMethod,
    path: string,
    params: Params | FormData,
    options?: { responseType: "arraybuffer" }
  ) => Promise<RequestConfig>;
}