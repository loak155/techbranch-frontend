import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";

export const useGetCommentCountsByArticleID = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [commentCounts, setCommentCounts] = useState<number>();

  const getCommentCountsByArticleID = useCallback(async (articleId : number) => {
    setLoading(true);

    await axios
      .get(`/articles/${articleId}/comments`)
      .then((res) => {
        setCommentCounts(res.data.comments.length)
      })
      .catch((err) => {
        showMessage({ title: "コメントの取得に失敗しました", status: "error" })
      })
      .finally(() => setLoading(false));
  }, []);

  return { getCommentCountsByArticleID, loading, commentCounts };
};
