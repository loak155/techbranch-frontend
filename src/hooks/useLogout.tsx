import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "../config/axios";

import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/providers/useLoginUserProvider";

export const useLogout = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const [cookies, setCookie, removeCookie] = useCookies();

  const [loading, setLoading] = useState(false);

  const logout = useCallback(async() => {
    setLoading(true);

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    };

    await axios
      .post("/signout", {}, header)
      .then(async (res) => {
        setLoginUser(null);
        removeCookie("accessToken");
        removeCookie("refreshToken");
        showMessage({ title: "ログアウトしました", status: "success" });
      })
      .catch((err) => {
        showMessage({ title: "ログアウトに失敗しました", status: "error" });
      });

    setLoading(false);
    history.push("/login");
  }, []);

  return { logout, loading };
};
