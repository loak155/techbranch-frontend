import { useCallback, useState } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessage";

export const useSignup = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const signup = useCallback((token: string | null) => {
    setLoading(true);

    const params = {
      token: token,
    };

    axios
      .get(`/signup`, { params: params })
      .then(async (res) => {
        if (res.data) {
          showMessage({ title: "ユーザ認証に成功しました", status: "success" });
          history.push("/login");
        }
      })
      .catch((err) => {
        showMessage({ title: "ユーザ認証に失敗しました", status: "error" });
        setLoading(false);
        history.push("/login");
      });
  }, []);

  return { signup, loading };
};
