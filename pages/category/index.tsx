import Link from "next/link";
import { useEffect, useState } from "react";

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

const fetchList = async (categoryCode = "") => {
  const response = await fetch(`/api/category?category=${categoryCode}`);
  const json = response.json();
  return json;
};

const SortBox = ({ setCategory }) => {
  return (
    <div>
      <h1>SortBox</h1>
      {categoryList.map((item) => (
        <div key={item.idx} onClick={() => setCategory(item.code)}>
          <div>{item.category}</div>
        </div>
      ))}
    </div>
  );
};

const Category = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchList(category).then((res) => {
      console.log(res.data);
      setList(() => res.data);
    });
  }, [category]);

  return (
    <div>
      <h1> 카테고리 게시판</h1>
      <SortBox setCategory={setCategory} />
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
