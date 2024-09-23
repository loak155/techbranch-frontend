import { FC, memo, useEffect, useState } from "react";
import { HeaderLayout } from "../templates/HeaderLayout";
import { ArticleCard } from "../organisms/article/ArticleCard";
import { Box, Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { useGetArticles } from "../../hooks/useGetArticles";
import { useGetArticleCount } from "../../hooks/useGetArticleCounts";
import ReactPaginate from 'react-paginate';


export const Home: FC = memo(() => {
  const { getArticles, loading, articles } = useGetArticles();
  const { getArticleCount, articleCount } = useGetArticleCount();
  const [ page, setPage ] = useState(1);

  const onPageChange = (selectedItem: { selected: number }) => {
    getArticles(selectedItem.selected * 12);
    setPage(selectedItem.selected + 1);
  }

  useEffect(() => {
    getArticles(page-1*10)
  }, [getArticles]);

  useEffect(() => {
    getArticleCount();
  }, []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
        <HeaderLayout>
          {articles && (
            <div>
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
              <div className="pagination-container">
              <ReactPaginate
                pageCount={Math.ceil(articleCount / 12)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                forcePage={page-1}
                onPageChange={onPageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
              </div>
            </div>
          )}
        </HeaderLayout>
      )}
    </>
  );
});
