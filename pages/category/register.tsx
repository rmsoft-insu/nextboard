import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const categoryList = [
  { idx: 1, category: "영화", code: "movie" },
  { idx: 2, category: "도서", code: "book" },
];

const movieKind = [
  { idx: 1, kind: "액션", code: "action" },
  { idx: 2, kind: "로맨스", code: "romance" },
  { idx: 3, kind: "드라마", code: "drama" },
  { idx: 4, kind: "공포", code: "horror" },
];

const bookKind = [
  { idx: 1, kind: "소설", code: "novel" },
  { idx: 2, kind: "과학", code: "science" },
  { idx: 3, kind: "기술/공학", code: "tech" },
];

const Register = () => {
  const selectRef = useRef();
  const { register, handleSubmit, setValue } = useForm();
  const [category, setCategory] = useState(null);
  const [kindList, setKindList] = useState([]);

  const submitClick = (data) => {
    console.log(data);
  };

  const categoryChange = (event) => {
    const { value } = event.target;
    setValue("category", value);
    setCategory(() => value);
  };

  const kindChange = (event) => {
    const { value } = event.target;
    setValue("kind", value);
  };

  useEffect(() => {
    register("category", { required: true });
    register("kind", { required: true });
  }, [register]);

  useEffect(() => {
    if (selectRef) {
      const { current } = selectRef as any;
      current.value = "";
    }
    category === "" && setKindList(() => []);
    category === "movie" && setKindList(() => movieKind);
    category === "book" && setKindList(() => bookKind);
  }, [category]);

  return (
    <div>
      <h1>카테고리 등록</h1>

      <form onSubmit={handleSubmit(submitClick)}>
        <select onChange={categoryChange}>
          <option value="">카테고리</option>
          {categoryList.map((item) => (
            <option key={item.idx} value={item.code}>
              {item.category}
            </option>
          ))}
        </select>
        <select ref={selectRef} onChange={kindChange}>
          <option value="">분류</option>
          {kindList.map((item) => (
            <option key={item.idx} value={item.code}>
              {item.kind}
            </option>
          ))}
        </select>
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="제목"
        />
        <input
          {...register("description", { required: true })}
          type="text"
          placeholder="설명"
        />
        <button>등록</button>
      </form>
    </div>
  );
};

export default Register;
