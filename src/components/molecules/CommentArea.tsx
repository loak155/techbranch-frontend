import { memo, FC, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FaRegCommentAlt } from "react-icons/fa";
import { useGetCommentCountsByArticleID } from "../../hooks/useGetCommentCountsByArticleID";

type Props = {
  articleId: number;
  onClick: () => void;
};

export const CommentArea: FC<Props> = memo((props) => {
  const { articleId, onClick } = props;
  const { getCommentCountsByArticleID, commentCounts } = useGetCommentCountsByArticleID();

  useEffect(() => {
    getCommentCountsByArticleID(articleId);
  }, []);

  return (
    <Flex align='center'>
      <FaRegCommentAlt onClick={onClick} />
      <Text ml={1} >
          { commentCounts }
        </Text>
    </Flex>
  );
});
