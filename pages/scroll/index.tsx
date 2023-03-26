import { useEffect, useState } from "react";
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

const fetchList = async () => {
  const response = await fetch(`http://localhost:4000/todos`);
  const json = await response.json();
  return json;
};

const InfiniteScroll = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList().then((res) => setList(res));
  }, []);

  return (
    <>
      <h1>한무 스크롤</h1>
      {list?.map((item, index) => (
        <Box key={item.id}>
          <span>No.{index + 1}</span>
          <span>{item.description}</span>
        </Box>
      ))}
    </>
  );
};

export default InfiniteScroll;
