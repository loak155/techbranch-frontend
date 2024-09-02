import { memo, FC, useEffect, useCallback } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useCreateBookmark } from "../../hooks/useCreateBookmark";
import { useDeleteBookmark } from "../../hooks/useDeleteBookmark";
import { useGetBookmarkCountsByArticleID } from "../../hooks/useGetBookmarkCountsByArticleID";
import { useGetIsBookmark } from "../../hooks/useGetIsBookmark";
import { useLoginUser } from "../../hooks/providers/useLoginUserProvider";

type Props = {
  articleId: number;
};

export const BookmarkArea: FC<Props> = memo((props) => {
  const { articleId } = props;
  const { createBookmark } = useCreateBookmark();
  const { deleteBookmark } = useDeleteBookmark();
  const { getBookmarkCountsByArticleID, bookmarkCounts } = useGetBookmarkCountsByArticleID();
  const { getIsBookmark, isBookmark } = useGetIsBookmark();
  const { loginUser } = useLoginUser();

  const onClickCreateBookmark = async () => {
    if (loginUser?.id) {
      await createBookmark(loginUser.id, articleId);
      await getIsBookmark(loginUser.id, articleId);
      await getBookmarkCountsByArticleID(articleId);
    }
  };

  const onClickDeleteBookmark = async () => {
    if (loginUser?.id) {
      await deleteBookmark(loginUser.id, articleId);
      await getIsBookmark(loginUser.id, articleId);
      await getBookmarkCountsByArticleID(articleId);
    }
  };

  useEffect(() => {
    getBookmarkCountsByArticleID(articleId);
    if (loginUser?.id) {
      getIsBookmark(loginUser.id, articleId);
    }
  }, []);

  return (
    <Flex align='center'>
        { isBookmark ?
          <FaBookmark onClick={onClickDeleteBookmark}/>
        :
          <FaRegBookmark onClick={onClickCreateBookmark}/>
        }
        <Text ml={1} >
          { bookmarkCounts }
        </Text>
    </Flex>
  );
});
