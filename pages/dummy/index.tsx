import axios from "axios";
import { useState } from "react";

const DummyTest = () => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const { data } = await axios.post("http://localhost:4000/todos", {
      text,
      isCompleted: false,
    });
    alert(data.text + "이 추가되었습니다.");
    setText("");
  };
  return (
    <div>
      <h1>JSON Server Test</h1>
      <input
        placeholder="할 일"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>추가하기</button>
    </div>
  );
};

export default DummyTest;
