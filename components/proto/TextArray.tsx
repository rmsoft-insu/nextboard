import { useState } from "react";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("./Card"));

const dummy = [
  { id: 1, text: "Text 1", correction: true },
  { id: 2, text: "Text 2", correction: true },
  { id: 3, text: "Text 3", correction: false },
  { id: 4, text: "Text 4", correction: true },
  { id: 5, text: "Text 5", correction: false },
  { id: 6, text: "Text 6", correction: false },
];

const TextArray = () => {
  const [list, setList] = useState(dummy);
  const [id, setId] = useState(null);

  // 반려 상태 확인 버튼
  const rejectCheck = () => {
    console.log(list.some((value) => value.correction === true));
  };

  // 반려 상태 설정
  const rejectStatus = list.some((value) => value.correction === true);

  return (
    <div>
      <div>Text Array</div>
      {list.map((item) => (
        <div
          key={item.id}
          style={{ display: "flex", gap: "10px", backgroundColor: "bisque" }}
        >
          <Card
            setId={setId}
            id={id}
            list={list}
            setList={setList}
            item={item}
          />
        </div>
      ))}
      <button type="button" onClick={() => console.log(list)}>
        버튼
      </button>
      <button type="button" onClick={rejectCheck}>
        반려상태
      </button>
    </div>
  );
};

export default TextArray;
