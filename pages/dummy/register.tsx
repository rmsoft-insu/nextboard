import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const DummyRegister = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const { data } = await axios.post("http://localhost:4000/todos", {
      description: text,
      isCompleted: false,
    });
    alert(data.description + "이 추가되었습니다.");
    router.push("/dummy");
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

export default DummyRegister;
