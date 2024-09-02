import { FC, memo, useEffect, useState } from "react";
import { HeaderLayout } from "../templates/HeaderLayout";
import { ArticleCard } from "../organisms/article/ArticleCard";
import { Box, Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { useGetBookmarkedArticles } from "../../hooks/useGetBookmarkedArticles";
import { useCookies } from "react-cookie";
import { useLoginUser } from "../../hooks/providers/useLoginUserProvider";


export const Bookmark: FC = memo(() => {
  const { getBookmarkedArticles, loading, articles } = useGetBookmarkedArticles();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { loginUser } = useLoginUser();

  useEffect(() => {
    if (loginUser) {
      getBookmarkedArticles(loginUser.id);
    }
  }, [getBookmarkedArticles]);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
        <HeaderLayout>
          <Wrap spacing={5} marginTop={5}>
            {articles.map((article) => (
              <WrapItem key={article.id} mx="auto">
                <ArticleCard
                  id={article.id}
                  title={article.title}
                  url={article.url}
                  image={article.image}
                  onClick={() => {}}
                />
              </WrapItem>
            ))}
          </Wrap>
        </HeaderLayout>
      )}
    </>
  );
});
