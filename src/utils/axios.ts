import axios from "axios";

type Err = {
  message: string;
  response: any;
};

// wrapper about error of axios

const errorHandler = (err: Err) => {
  // console.log("error", err);
  throw Error();
};

export const instanceAxios = axios.create();

instanceAxios.interceptors.request.use((req) => req, errorHandler);
instanceAxios.interceptors.response.use((res) => res, errorHandler);

export default instanceAxios;
