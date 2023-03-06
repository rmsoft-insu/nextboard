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

const fetchPost = async (data) => {
  const response = await fetch("/api/category/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const Register = () => {
  const selectRef = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [category, setCategory] = useState(null);
  const [kindList, setKindList] = useState([]);

  const submitClick = async (data) => {
    await fetchPost(data).then((res) => console.log(res));
  };

  const categoryChange = (event) => {
    clearErrors("category");
    const { value } = event.target;
    setValue("category", value);
    setCategory(() => value);
  };

  const kindChange = (event) => {
    clearErrors("kind");
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
      <h1>게시글 등록</h1>

      <form onSubmit={handleSubmit(submitClick)}>
        <div>
          <div>카테고리</div>
          <select onChange={categoryChange}>
            <option value="">카테고리</option>
            {categoryList.map((item) => (
              <option key={item.idx} value={item.code}>
                {item.category}
              </option>
            ))}
          </select>
          <div style={{ color: "red" }}>
            {errors.category && "카테고리를 선택해주세요"}
          </div>
        </div>

        <div>
          <div>분류</div>
          <select ref={selectRef} onChange={kindChange}>
            <option value="">분류</option>
            {kindList.map((item) => (
              <option key={item.idx} value={item.code}>
                {item.kind}
              </option>
            ))}
          </select>
          <div style={{ color: "red" }}>
            {errors.kind && "분류를 선택해주세요"}
          </div>
        </div>

        <input
          {...register("title", { required: true, minLength: 3 })}
          type="text"
          placeholder="제목"
        />
        <div style={{ color: "red" }}>
          {errors.title && "제목을 입력해주세요"}
        </div>
        <input
          {...register("description", { required: true, minLength: 10 })}
          type="text"
          placeholder="설명"
        />
        <div style={{ color: "red" }}>
          {errors.description && "설명을 입력해주세요(10자 이상)"}
        </div>
        <button>등록</button>
      </form>
    </div>
  );
};

export default Register;
