import Axios from "axios";
import { useCookies } from "react-cookie";

const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const [cookies, setCookie] = useCookies();
      await axios
        .post(`/refresh-token?refreshToken=${cookies.refreshToken}`)
        .then((res) => {
          var accessTokenExpires = new Date();
          accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + res.data.access_token_expires_in);
          setCookie("accessToken", res.data.access_token, { expires: accessTokenExpires });
          return Promise.resolve();
        })
        .catch((err) => {
        })
        .finally(() => {
        });
    }
    return Promise.reject(error);
  }
);

export default axios;