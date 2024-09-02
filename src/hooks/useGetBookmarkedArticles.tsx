import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";
import { useHistory } from "react-router-dom";
import { Article } from "../types/article";
import { useCookies } from "react-cookie";

export const useGetBookmarkedArticles = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const getBookmarkedArticles = useCallback(async (userId : number) => {
    setLoading(true);

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    };

    await axios
      .get(`users/${userId}/bookmarks/articles`, header)
      .then((res) => {
        setArticles(res.data.articles)
      })
      .catch((err) => {
        showMessage({ title: "記事の取得に失敗しました", status: "error" })
      })
      .finally(() => setLoading(false));
  }, []);

  return { getBookmarkedArticles, loading, articles };
};
