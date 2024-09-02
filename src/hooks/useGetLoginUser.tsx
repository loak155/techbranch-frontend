import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";
import { User } from "../types/user";
import { useLoginUser } from "./providers/useLoginUserProvider";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export const useGetLoginUser = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { loginUser, setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [cookies, setCookie, removeCookie] = useCookies();

  const getLoginUser = useCallback(() => {
    setLoading(true);

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    };

    axios
      .get(`/signin/user`, header)
      .then((res) => {
        setUser(res.data);
        setLoginUser({...res.data.user});
      })
      .catch((err) => {
        showMessage({ title: "ユーザの取得に失敗しました", status: "error" })
        history.push("/login")
      })
      .finally(() => setLoading(false));
  }, []);

  return { getLoginUser, loading, user };
};
