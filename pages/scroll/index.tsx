import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: burlywood;
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  span {
    margin-right: 10px;
    font-weight: bold;
  }
`;

const fetchList = async (pageNum) => {
  const pageSize = 5;
  const response = await fetch(
    `http://localhost:4000/todos?_page=${pageNum}&_limit=${pageSize}`
  );
  const json = await response.json();
  return json;
};

const InfiniteScroll = () => {
  const { data, fetchNextPage, isSuccess, hasNextPage } = useInfiniteQuery(
    ["eventList"],
    ({ pageParam = 1 }) => fetchList(pageParam),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const handleScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      if (scrollHeight - scrollTop - clientHeight === 0) {
        hasNextPage && (await fetchNextPage());
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <h1>한무 스크롤</h1>
      {isSuccess &&
        data?.pages.map((page) =>
          page.map((item) => (
            <Box key={item.id}>
              <span>No.{item.id}</span>
              <span>{item.description}</span>
            </Box>
          ))
        )}
    </>
  );
};

export default InfiniteScroll;
