import { useCallback, useState } from "react";
import axios from "../config/axios";

import { Bookmark } from "../types/bookmark";
import { useMessage } from "./useMessage";
import { useCookies } from "react-cookie";

export const useGetBookmarksByUserID = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const getBookmarksByUserID = useCallback((userId : number) => {
    setLoading(true);

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    };

    axios
      .get(`/users/${userId}/bookmarks`, header)
      .then((res) => setBookmarks(res.data.articles))
      .catch(() => showMessage({ title: "ブックマークの取得に失敗しました", status: "error" }))
      .finally(() => setLoading(false));
  }, []);

  return { getBookmarksByUserID, loading, bookmarks };
};
