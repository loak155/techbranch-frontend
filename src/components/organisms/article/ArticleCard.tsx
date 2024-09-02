import { memo, FC } from "react";
import { Box, HStack, Image, Link, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { BookmarkArea } from "../../molecules/BookmarkArea";
import { CommentArea } from "../../molecules/CommentArea";
import { ArticleComment } from "../modal/ArticleComment";
import { useLoginUser } from "../../../hooks/providers/useLoginUserProvider";

type Props = {
  id: number;
  title: string;
  url: string;
  image: string;
  onClick: (id: number) => void;
};

export const ArticleCard: FC<Props> = memo((props) => {
  const { id, title, url, image, onClick } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginUser } = useLoginUser();

  const onClickComment = () => {
    onOpen();
  }

  return (
    <>
      <Box
        w="500px"
        h="160px"
        bg="white"
        borderRadius="10px"
        shadow="md"
        p={4}
        _hover={{ cursor: "pointer", opacity: 0.8 }}
        onClick={() => onClick(id)}
      >
        <HStack>
            <Image
              borderColor="black"
              borderRadius="10px"
              shadow="md"
              w="240px"
              h="126px"
              fit="cover"
              src={image}
              alt={title}
            />
          <VStack>
            <a href={url} target="_blank" style={{textDecoration: "none", width: "100%"}}>
              <Text
                style={{
                  fontSize: "lg",
                  fontWeight: "bold",
                  display: "-webkit-box",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
                >
                  {title}
              </Text>
            </a>
            <HStack spacing={5} >
              <BookmarkArea articleId={id} />
              <CommentArea articleId={id} onClick={onClickComment} />
            </HStack>
          </VStack>
        </HStack>

      </Box>
      <ArticleComment
        articleId={id}
        isOpen={isOpen}
        isLogin={loginUser? true : false}
        onClose={onClose}
      />
    </>
  );
});
