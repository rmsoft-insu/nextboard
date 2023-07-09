import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsXCircle } from "react-icons/bs";
import styled from "styled-components";

const dummy = [
  { id: 1, text: "Text 1", correction: true },
  { id: 2, text: "Text 2", correction: true },
  { id: 3, text: "Text 3", correction: false },
  { id: 4, text: "Text 4", correction: true },
  { id: 5, text: "Text 5", correction: false },
  { id: 6, text: "Text 6", correction: false },
];

const CheckLabel = styled.label`
  cursor: pointer;
  &:hover {
    color: green;
  }
`;

const CheckContainer = styled.div`
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked + ${CheckLabel} {
    color: green;
  }
`;

const DeleteButton = styled.div`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const TextContainer = styled.div`
  width: 200px;
  background-color: burlywood;
  border: 1px solid black;
`;

const TextArray = () => {
  const [list, setList] = useState(dummy);

  const handleDelete = (item) => {
    setList(() => list.filter((value) => value.id !== item.id));
  };

  const handleCheck = (event, item) => {
    event.preventDefault();
    setList(() =>
      list.map((value) => {
        if (value.id === item.id) {
          value.correction = !value.correction;
        }
        return value;
      })
    );
  };

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
        <div key={item.id} style={{ display: "flex", gap: "10px" }}>
          <CheckContainer>
            <input
              id={`${item.id}`}
              type="checkbox"
              defaultChecked={item.correction}
            />
            <CheckLabel
              htmlFor={`${item.id}`}
              onClick={(event) => handleCheck(event, item)}
            >
              <AiOutlineCheckCircle size={20} />
            </CheckLabel>
          </CheckContainer>

          <div>00:00 ~ 00:00</div>

          <TextContainer>
            <div>{item.text}</div>
          </TextContainer>

          <DeleteButton onClick={() => handleDelete(item)}>
            <BsXCircle size={20} />
          </DeleteButton>
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
