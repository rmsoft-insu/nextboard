import { useState } from "react";
import { useForm, FieldErrors, FieldValues } from "react-hook-form";
import styled from "styled-components";

const Area = styled.textarea`
  white-space: pre-wrap;
  resize: none;
  padding: 10px;
`;

interface TextForm {
  text: string;
}

const TextArea = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ mode: "all" });
  const [text, setText] = useState("");
  const submitArea = (data: TextForm) => {
    console.log(data);
    setText(data.text);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitArea)}>
        <Area
          {...register("text", {
            required: { value: true, message: "Error" },
            validate: {
              notAbc: (value) =>
                !value.includes("abc") ? "" : "ABC not allowed",
            },
          })}
        />
        <button>제출</button>
      </form>
      <span>{errors?.text?.message as string}</span>
      <textarea value={text} />
    </div>
  );
};

export default TextArea;
