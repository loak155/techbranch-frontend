import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";
import { Bookmark } from "../types/bookmark";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export const useCreateBookmark = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const createBookmark = useCallback(async (userId : number, articleId: number) => {
    setLoading(true);

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    };

    const body = {
      userId: userId,
      articleId: articleId,
    };

    await axios
      .post<Bookmark>("/bookmarks", JSON.stringify(body), header)
      .then((res) => {
        showMessage({ title: "ブックマークしました", status: "success" })
      })
      .catch((err) => {
        showMessage({ title: "ブックマークに失敗しました", status: "error" })
        history.push("/")
      })
      .finally(() => setLoading(false));
  }, []);

  return { createBookmark, loading };
};
