import { useEffect, useState } from "react";

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
        <div key={item.id}>
          <span>No.{index + 1}</span>
          <span>{item.description}</span>
        </div>
      ))}
    </>
  );
};

export default InfiniteScroll;
