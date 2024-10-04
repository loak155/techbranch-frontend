import { useCallback, useState } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useCookies } from "react-cookie";

import { useMessage } from "./useMessage";

export const useGoogleLoginCallback = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [cookies, setCookie, removeCookie] = useCookies();

  const [loading, setLoading] = useState(false);

  const googleLoginCallback = useCallback((state : string | null, code : string | null) => {
    setLoading(true);

    const params = {
      state: state,
      code: code,
    };

    interface AuthJwtPayload extends JwtPayload {
      userId: number;
      exp: number;
    }

    axios
      .get(`/oauth/google/callback`, { params: params })
      .then(async (res) => {
        if (res.data) {
          var accessTokenExpires = new Date();
          var refreshTokenExpires  = new Date();
          accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + res.data.access_token_expires_in);
          refreshTokenExpires.setSeconds(refreshTokenExpires.getSeconds() + res.data.refresh_token_expires_in);
          setCookie("accessToken", res.data.access_token, { expires: accessTokenExpires });
          setCookie("refreshToken", res.data.refresh_token, { expires: refreshTokenExpires });
          showMessage({ title: "ログインしました", status: "success" });
        } else {
          showMessage({ title: "ログインに失敗しました", status: "error" });
          setLoading(false);
        }
        history.push("/");
      })
      .catch((err) => {
        showMessage({ title: "ログインに失敗しました", status: "error" });
        setLoading(false);
        history.push("/login");
      });
  }, []);

  return { googleLoginCallback, loading };
};
