const categoryList = [
  { idx: 1, category: "영화", code: "movie" },
  { idx: 2, category: "도서", code: "book" },
];

const CategoryBox = ({ setCategory }) => {
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

export default CategoryBox;
