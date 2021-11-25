import Axios from "axios";

const axios = Axios.create({
  // ToDo: move to constant
  baseURL: "http://localhost:5000/api"
});

export default axios;
