import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const DummyTest = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const { data } = await axios.get(
      "http://localhost:4000/todos?_page=1&_limit=5"
    );
    setList(data);
    console.log(data);
  };

  const toggleCompleteBtn = async (id, isCompleted) => {
    await axios.patch(`http://localhost:4000/todos/${id}`, {
      isCompleted: !isCompleted,
    });
    await fetchList();
  };

  const deleteBtn = async (id) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    await fetchList();
  };

  useEffect(() => {
    (async () => {
      await fetchList();
    })();
  }, []);

  return (
    <div>
      <h1>JSON Server Test</h1>
      <Link href="/dummy/register">등록하기</Link>
      {list?.map((item, index) => (
        <div key={item.id}>
          <div key={item.id}>
            {`No. ${index + 1} `}
            {item.description}
          </div>
          <button onClick={() => toggleCompleteBtn(item.id, item.isCompleted)}>
            {item.isCompleted ? "완료" : "미완료"}
          </button>
          <button onClick={() => deleteBtn(item.id)}>삭제하기</button>
        </div>
      ))}
    </div>
  );
};

export default DummyTest;
