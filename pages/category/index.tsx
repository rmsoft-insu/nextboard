import Link from "next/link";

const Category = () => {
  return (
    <div>
      <h1> 카테고리 게시판</h1>
      <div>
        <div>
          <Link href="/category/register">카테고리 등록</Link>
        </div>
        <div>Category</div>
      </div>
    </div>
  );
};

export default Category;
