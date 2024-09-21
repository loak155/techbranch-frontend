import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";
import { Comment } from "../types/comment";

export const useGetCommentByArticleID = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Array<Comment>>([]);

  const getCommentByArticleID = useCallback(async (articleId: number) => {
    setLoading(true);

    await axios
      .get(`/articles/${articleId}/comments`)
      .then((res) => {
        if (!res.data.comments) {
          setComments([]);
        } else {
          setComments(res.data.comments);
        }
      })
      .catch((err) => {
        showMessage({ title: "コメントの取得に失敗しました", status: "error" })
      })
      .finally(() => setLoading(false));
  }, []);

  return { getCommentByArticleID, loading, comments };
};
