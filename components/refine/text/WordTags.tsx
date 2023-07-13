import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import styled from "styled-components";

const option = [
  { value: "NEOLOGISM", label: "신조어" },
  { value: "ABBERVIATION", label: "약어" },
];

const optionObj = {
  NEOLOGISM: "신조어",
  ABBERVIATION: "약어",
};

const WordTags = ({ name, value, ...rest }) => {
  const [list, setList] = useState(value);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const handleWordTag = (data) => {
    const checkDuplicate = value.some(
      (el) => el.word.toLowerCase() === data.word.trim().toLowerCase()
    );
    if (checkDuplicate) {
      setError("word", {
        type: "custom",
        message: "중복된 단어는 추가할 수 없습니다.",
      });
      return;
    } else {
      const setData = {
        type: data.type,
        word: data.word,
        languageType: "KOREAN",
      };
      rest.onChange([...value, setData]);
      reset();
    }
  };

  useEffect(() => {
    setList(value);
  }, [value]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleWordTag)}>
        {option.map((el) => (
          <div key={el.value}>
            <label>
              <input
                type="radio"
                value={el.value}
                {...register("type")}
                name="type"
              />
              {el.label}
            </label>
          </div>
        ))}
        {watch("type") ? (
          <div>
            <input type="text" {...register(`word`)} />
            <button>추가하기</button>
            {errors?.word?.message && (
              <ErrorMessage>중복된 단어는 추가할 수 없습니다.</ErrorMessage>
            )}
          </div>
        ) : (
          ""
        )}
      </form>

      {list?.map((el) => (
        <div key={el.word}>
          <span>{optionObj[el.type]}</span>-<span>{el.word}</span>
        </div>
      ))}
    </div>
  );
};

export default WordTags;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  min-height: 20px;
  padding: 0px 15px;
  color: #ff0000;
  font-size: 12px;
`;
