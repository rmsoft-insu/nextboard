import Link from "next/link";
import { useEffect, useState } from "react";

const categoryList = [
  { idx: 1, category: "영화", code: "movie" },
  { idx: 2, category: "도서", code: "book" },
];

const fetchList = async (categoryCode = "", kind = "") => {
  const response = await fetch(
    `/api/category?category=${categoryCode}&kind=${kind}`
  );
  const json = await response.json();
  return json;
};

const SortBox = ({ setCategory }) => {
  return (
    <div>
      <h1>SortBox</h1>
      <div onClick={() => setCategory(() => "")}>전체</div>
      {categoryList.map((item) => (
        <div key={item.idx} onClick={() => setCategory(item.code)}>
          <div>{item.category}</div>
        </div>
      ))}
    </div>
  );
};

const SortDetailBox = ({ category, setKind }) => {
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

  return (
    <div>
      <h1>SortDetailBox</h1>
      {category === "book" && (
        <div>
          {bookKind.map((item) => (
            <div key={item.idx} onClick={() => setKind(() => item.code)}>
              {item.kind}
            </div>
          ))}
        </div>
      )}

      {category === "movie" && (
        <div>
          {movieKind.map((item) => (
            <div key={item.idx} onClick={() => setKind(() => item.code)}>
              <div>{item.kind}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Category = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("");
  const [kind, setKind] = useState("");

  useEffect(() => {
    fetchList(category, kind).then((res) => {
      setList(() => res.data);
    });
  }, [category, kind]);

  useEffect(() => {
    setKind(() => "");
  }, [category]);

  return (
    <div>
      <h1> 카테고리 게시판</h1>
      <SortBox setCategory={setCategory} />
      {category !== "" && (
        <SortDetailBox category={category} setKind={setKind} />
      )}
      <div>
        <div>
          <Link href="/category/register">카테고리 등록</Link>
        </div>
        <div>Category</div>
        {list.map((item) => (
          <div key={item.idx}>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
