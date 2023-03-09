import Link from "next/link";
import { useEffect, useState } from "react";
import CategoryBox from "@/components/category/Category";
import CategoryDetail from "@/components/category/CategoryDetail";

const fetchList = async (categoryIdx = "", kindIdx = "") => {
  const response = await fetch(
    `/api/category?category=${categoryIdx}&kind=${kindIdx}`
  );
  const json = await response.json();
  return json;
};

const Category = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState(null);
  const [kind, setKind] = useState(null);

  useEffect(() => {
    fetchList(category?.idx, kind?.idx).then((res) => {
      setList(() => res.data);
    });
  }, [category, kind]);

  useEffect(() => {
    setKind(() => null);
  }, [category]);

  return (
    <div>
      <h1> 카테고리 게시판</h1>
      <CategoryBox setCategory={setCategory} />
      {category !== null && (
        <CategoryDetail category={category.code} setKind={setKind} />
      )}
      <div>
        <div>
          <Link href="/category/register">게시글 등록</Link>
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
