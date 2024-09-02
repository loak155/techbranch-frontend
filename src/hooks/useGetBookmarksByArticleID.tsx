import { useCallback, useState } from "react";
import axios from "../config/axios";

import { Bookmark } from "../types/bookmark";
import { useMessage } from "./useMessage";

export const useGetBookmarksByArticleID = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);

  const getBookmarksByArticleID = useCallback((articleId : number) => {
    setLoading(true);

    axios
      .get(`/articles/${articleId}/bookmarks`)
      .then((res) => {
        setBookmarks(res.data.bookmarks)
      })
      .catch((err) => {
        showMessage({ title: "ブックマークの取得に失敗しました", status: "error" })
      })
      .finally(() => setLoading(false));
  }, []);

  return { getBookmarksByArticleID, loading, bookmarks };
};
