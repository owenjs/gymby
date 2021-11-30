import axios from "/@/api/gymby/v1/axios";
import { ILoginInFields, ILoginInResponse } from "/@/types/loginIn";

const signIn = async (data: ILoginInFields): Promise<ILoginInResponse> => {
  const { data: responseData } = await axios.post("/auth", data);

  return responseData;
};

export default signIn;
