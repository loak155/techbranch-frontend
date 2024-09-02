import { useCallback, useState } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessage";

export const useGoogleLogin = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const googleLogin = useCallback(() => {
    setLoading(true);

    axios
      .get(`/oauth/google/login`)
      .then(async (res) => {
        if (res.data) {
          const googleLoginUrl = res.data.url;
          window.location.replace(googleLoginUrl)
        } else {
          showMessage({ title: "ログインに失敗しました", status: "error" });
          setLoading(false);
        }
      })
      .catch(() => {
        showMessage({ title: "ログインに失敗しました", status: "error" });
        setLoading(false);
      });
  }, []);

  return { googleLogin, loading };
};
