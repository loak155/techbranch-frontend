import { ChangeEvent, memo, useEffect, useState, FC } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useCreateComment } from "../../../hooks/useCreateComment";
import { useCookies } from "react-cookie";
import { useGetCommentByArticleID } from "../../../hooks/useGetCommentByArticleID";
import { useLoginUser } from "../../../hooks/providers/useLoginUserProvider";

type Props = {
  articleId: number;
  isOpen: boolean;
  isLogin?: boolean;
  onClose: () => void;
};

export const ArticleComment: FC<Props> = memo((props) => {
  const { articleId, isOpen, onClose, isLogin = false } = props;
  const { createComment } = useCreateComment();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { getCommentByArticleID, comments } = useGetCommentByArticleID();
  const [comment, setComment] = useState("");
  const { loginUser, setLoginUser } = useLoginUser();

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

  const onClickCreateComment = async () => {
    if (loginUser) {
      await createComment(loginUser.id, articleId, comment);
    }
    await getCommentByArticleID(articleId);
    setComment("");
  };

  useEffect(() => {
    if (!isOpen) {
      setComment("");
      getCommentByArticleID(articleId);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>コメント</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={6}>
          <Stack spacing={4}>
            {comments.map((comment) => (
              <Text key={comment.id}>
                {comment.content}
              </Text>
            ))}
              {isLogin && (
              <FormControl>
                <Textarea
                  value={comment}
                  isReadOnly={!isLogin}
                  onChange={onChangeComment}
                />
              </FormControl>
            )}
          </Stack>
        </ModalBody>
        {isLogin && (
          <ModalFooter>
            <PrimaryButton onClick={onClickCreateComment}>投稿</PrimaryButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
});
