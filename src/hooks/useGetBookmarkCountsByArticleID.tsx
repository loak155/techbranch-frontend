import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";

export const useGetBookmarkCountsByArticleID = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [bookmarkCounts, setBookmarkCounts] = useState<number>();

  const getBookmarkCountsByArticleID = useCallback(async (articleId : number) => {
    setLoading(true);

    await axios
      .get(`/articles/${articleId}/bookmarks`)
      .then((res) => {
        setBookmarkCounts(res.data.bookmarks.length)
      })
      .catch((err) => {
        showMessage({ title: "ブックマークの取得に失敗しました", status: "error" })
      })
      .finally(() => setLoading(false));
  }, []);

  return { getBookmarkCountsByArticleID, loading, bookmarkCounts };
};
