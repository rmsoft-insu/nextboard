import { useForm } from "react-hook-form";
import { useState } from "react";

const WordTagInput = ({ name, value, ...rest }) => {
  //console.log(rest);
  const [list, setList] = useState(value);
  const { register, handleSubmit, reset } = useForm();

  const handleWordTag = (data) => {
    console.log(data);
    const setData = {};
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleWordTag)}>
        <input type="text" {...register(`word`)} />
        <button>추가하기</button>
      </form>

      {list?.map((el) => (
        <div key={el.word}>{el.word}</div>
      ))}
    </div>
  );
};

export default WordTagInput;
