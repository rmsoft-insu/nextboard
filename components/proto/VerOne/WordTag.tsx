import { useState } from "react";
import { useForm } from "react-hook-form";

const option = [
  { value: "slang", label: "신조어" },
  { value: "abbreviation", label: "약어" },
];

const WordTag = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setList((prev) => {
      if (prev.includes(data.slang.trim())) {
        return [...prev];
      } else {
        return [...prev, data.slang];
      }
    });
    reset();
  };

  const handleDelete = (item) => {
    setList((prev) => prev.filter((value) => value !== item));
  };

  return (
    <div>
      {option.map((el) => (
        <div key={el.value}>
          <input type="radio" id={el.value} value={el.value} name="tag" />
          <label htmlFor={el.value}>{el.label}</label>
        </div>
      ))}

      {list.map((item, index) => (
        <div key={index}>
          {item} <span onClick={() => handleDelete(item)}>X</span>
        </div>
      ))}
    </div>
  );
};

export default WordTag;
