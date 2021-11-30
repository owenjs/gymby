import Axios from "axios";

const axios = Axios.create({
  // ToDo: move to constant
  baseURL: "http://localhost:5000/api"
});

export const setAuthTokenHeader = (token: string) => {
  axios.defaults.headers.common["x-auth-token"] = token;
};

export default axios;
