const categoryList = [
  { idx: 1, category: "영화", code: "movie" },
  { idx: 2, category: "도서", code: "book" },
];

import styled from "styled-components";

const SelectBox = styled.div`
  background-color: burlywood;
  padding: 10px;
  margin-right: 10px;
`;

const CategoryBox = ({ setCategory }) => {
  return (
    <>
      <h1>Category</h1>
      <div style={{ display: "flex" }}>
        <SelectBox onClick={() => setCategory(() => "")}>전체</SelectBox>
        {categoryList.map((item) => (
          <SelectBox key={item.idx} onClick={() => setCategory(item.code)}>
            <div>{item.category}</div>
          </SelectBox>
        ))}
      </div>
    </>
  );
};

export default CategoryBox;
