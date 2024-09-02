import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";

export const useGetArticleCount = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [articleCount, setArticleCount] = useState(0);

  const getArticleCount = useCallback(() => {
    setLoading(true);

    axios
      .get(`/articles/counts`)
      .then((res) => setArticleCount(res.data.counts))
      .catch(() => showMessage({ title: "記事取得に失敗しました", status: "error" }))
      .finally(() => setLoading(false));
  }, []);

  return { getArticleCount, loading, articleCount };
};
