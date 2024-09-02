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
          const payload = jwtDecode<AuthJwtPayload>(res.data.token);
          setCookie("token", res.data.token, { expires: new Date(payload.exp * 1000) });
          setCookie("userId", payload.userId, { expires: new Date(payload.exp * 1000) });
          showMessage({ title: "ログインしました", status: "success" });
        } else {
          showMessage({ title: "ログインに失敗しました", status: "error" });
          setLoading(false);
        }
        history.push("/");
      })
      .catch(() => {
        showMessage({ title: "ログインに失敗しました", status: "error" });
        setLoading(false);
        history.push("/login");
      });
  }, []);

  return { googleLoginCallback, loading };
};
