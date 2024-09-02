import { useCallback, useState } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/user";
import { useMessage } from "./useMessage";

export const usePreSignup = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const presignup = useCallback((username: string, email: string, password: string) => {
    setLoading(true);

    const body = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post<User>(`signup`, JSON.stringify(body))
      .then(async (res) => {
        if (res.data) {
          showMessage({ title: "仮登録が完了しました。メールをご確認ください。", status: "success" });
          history.push("/login");
        } else {
          showMessage({ title: "ユーザ登録に失敗しました", status: "error" });
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data.message.includes("duplicate key value violates unique constraint")) {
          showMessage({ title: "すでに登録済みです", status: "error" });
        } else {
          showMessage({ title: "ユーザ登録に失敗しました", status: "error" });
        }
        setLoading(false);
      });
  }, []);

  return { presignup, loading };
};
