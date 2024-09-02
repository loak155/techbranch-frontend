import { useCallback, useState } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Auth } from "../types/auth";
import { useMessage } from "./useMessage";

export const useLogin = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [cookies, setCookie, removeCookie] = useCookies();

  const [loading, setLoading] = useState(false);

  const login = useCallback((email: string, password: string) => {
    setLoading(true);

    const body = {
      email: email,
      password: password,
    };

    axios
      .post<Auth>(`/signin`, JSON.stringify(body))
      .then(async (res) => {
        if (res.data) {
          var accessTokenExpires = new Date();
          var refreshTokenExpires  = new Date();
          accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + res.data.access_token_expires_in);
          refreshTokenExpires.setSeconds(refreshTokenExpires.getSeconds() + res.data.refresh_token_expires_in);
          setCookie("accessToken", res.data.access_token, { expires: accessTokenExpires });
          setCookie("refreshToken", res.data.refresh_token, { expires: refreshTokenExpires });
          showMessage({ title: "ログインしました", status: "success" });
          history.push("/");
        } else {
          console.log("res", res);
          showMessage({ title: "ユーザーが見つかりません", status: "error" });
          setLoading(false);
        }
      })
      .catch((err) => {
        showMessage({ title: "ユーザーが見つかりません", status: "error" });
        setLoading(false);
      });
  }, []);

  return { login, loading };
};
