import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export const useDeleteBookmark = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const deleteBookmark = useCallback(async (user_id : number, article_id: number) => {
    setLoading(true);

    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.accessToken}`,
    };

    await axios
      .delete(`/users/${user_id}/articles/${article_id}/bookmarks`, {headers: header})
      .then(() => showMessage({ title: "ブックマークを解除しました", status: "success" }))
      .catch(() => {
        showMessage({ title: "ブックマークの解除に失敗しました", status: "error" })
        history.push("/")
      })
      .finally(() => setLoading(false));
  }, []);

  return { deleteBookmark, loading };
};
