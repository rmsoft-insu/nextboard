import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const fetchPost = async (data) => {
  const response = await fetch("/api/category/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const fetchCategory = async () => {
  const response = await fetch("/api/category/menu");
  const json = await response.json();
  return json;
};

const fetchKind = async () => {
  const response = await fetch("/api/category/kind");
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

  const [category, setCategory] = useState("");
  const [kindList, setKindList] = useState([]);
  const [kind, setKind] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const submitClick = async (data) => {
    await fetchPost(data).then((res) => console.log(res));
  };

  const categoryChange = (event) => {
    clearErrors("menu");
    const { id } = event.target.selectedOptions[0];
    const { value } = event.target;
    setValue("menu", id);
    setCategory(() => value);
  };

  const kindChange = (event) => {
    clearErrors("kind");
    const { id } = event.target.selectedOptions[0];
    setValue("kind", id);
  };

  useEffect(() => {
    register("menu", { required: true });
    register("kind", { required: true });
  }, [register]);

  useEffect(() => {
    fetchCategory().then((res) => setCategoryList(() => res.menu));
    fetchKind().then((res) => setKind(() => res));
    setLoading(() => false);
  }, []);

  useEffect(() => {
    if (selectRef) {
      const { current } = selectRef as any;
      current.value = "";
    }
    category === "" && setKindList(() => []);
    category === "movie" && setKindList(() => kind.movie);
    category === "book" && setKindList(() => kind.book);
  }, [category, kind]);

  return (
    <div>
      <h1>게시글 등록</h1>

      <form onSubmit={handleSubmit(submitClick)}>
        <div>
          <div>카테고리</div>
          <select onChange={categoryChange}>
            <option value="">카테고리</option>
            {loading ||
              categoryList.map((item) => (
                <option key={item.idx} value={item.code} id={item.idx}>
                  {item.name}
                </option>
              ))}
          </select>

          <div style={{ color: "red" }}>
            {errors.menu && "카테고리를 선택해주세요"}
          </div>
        </div>

        <div>
          <div>분류</div>
          <select ref={selectRef} onChange={kindChange}>
            <option value="">분류</option>
            {kindList.map((item) => (
              <option key={item.idx} value={item.code} id={item.idx}>
                {item.name}
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
