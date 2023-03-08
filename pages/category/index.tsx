import Link from "next/link";
import { useEffect, useState } from "react";
import CategoryBox from "@/components/category/Category";
import CategoryDetail from "@/components/category/CategoryDetail";

const fetchList = async (categoryCode = "", kind = "") => {
  const response = await fetch(
    `/api/category?category=${categoryCode}&kind=${kind}`
  );
  const json = await response.json();
  return json;
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
      <CategoryBox setCategory={setCategory} />
      {category !== "" && (
        <CategoryDetail category={category} setKind={setKind} />
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
