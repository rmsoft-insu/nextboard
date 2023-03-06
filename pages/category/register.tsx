import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const categoryList = [
  { idx: 1, category: "영화", code: "movie" },
  { idx: 2, category: "도서", code: "book" },
];

const movieKind = [
  { idx: 1, kind: "액션" },
  { idx: 2, kind: "로맨스" },
  { idx: 3, kind: "드라마" },
  { idx: 4, kind: "공포" },
];

const bookKind = [
  { idx: 1, kind: "소설" },
  { idx: 2, kind: "과학" },
  { idx: 3, kind: "기술/공학" },
];

const Register = () => {
  const selectRef = useRef();
  const { register, handleSubmit } = useForm();
  const [category, setCategory] = useState(null);
  const [kindList, setKindList] = useState([]);

  const submitClick = (data) => {
    console.log(data);
  };

  const categoryChange = (event) => {
    console.log(event.target.value);
    setCategory(() => event.target.value);
  };

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
        <select ref={selectRef}>
          <option value="">분류</option>
          {kindList.map((item) => (
            <option key={item.idx}>{item.kind}</option>
          ))}
        </select>
        <input type="text" />
        <button>버튼</button>
      </form>
    </div>
  );
};

export default Register;
