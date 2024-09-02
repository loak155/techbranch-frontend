import { useCallback, useState } from "react";
import axios from "../config/axios";

import { useMessage } from "./useMessage";
import { Comment } from "../types/comment";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export const useCreateComment = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const createComment = useCallback(async (userId: number, articleId: number, content: string) => {
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
      content: content,
    };

    await axios
      .post<Comment>("/comments", JSON.stringify(body), header)
      .then((res) => {
        showMessage({ title: "コメントしました", status: "success" })
      })
      .catch((err) => {
        showMessage({ title: "コメントに失敗しました", status: "error" })
        history.push("/")
      })
      .finally(() => setLoading(false));
  }, []);

  return { createComment, loading };
};
