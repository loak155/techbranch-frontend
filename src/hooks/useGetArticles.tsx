import { useCallback, useState } from "react";
import axios from "../config/axios";

import { Article } from "../types/article";
import { useMessage } from "./useMessage";

export const useGetArticles = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Array<Article>>([]);

  const getArticles = useCallback((offset: number) => {
    setLoading(true);

    axios
      .get(`/articles?offset=${offset}&limit=12`)
      .then((res) => setArticles(res.data.articles))
      .catch(() => showMessage({ title: "記事取得に失敗しました", status: "error" }))
      .finally(() => setLoading(false));
  }, []);

  return { getArticles, loading, articles };
};
