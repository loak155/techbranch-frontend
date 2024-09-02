import { useCallback, useState } from "react";
import axios from "../config/axios";

import { Bookmark } from "../types/bookmark";
import { useMessage } from "./useMessage";
import { useCookies } from "react-cookie";

export const useGetIsBookmark = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const getIsBookmark = useCallback(async (userId : number, articleId : number) => {
    setLoading(true);

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    };

    await axios
    .get(`/users/${userId}/bookmarks`, header)
    .then((res) => {
      setIsBookmark(res.data.bookmarks.some((bookmark: Bookmark) => bookmark.article_id === articleId));
    })
    .catch((err) => {
      showMessage({ title: "ブックマークの取得に失敗しました", status: "error" })
    })
    .finally(() => setLoading(false));
  }, []);

  return { getIsBookmark, loading, isBookmark };
};
