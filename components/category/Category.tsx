import { useEffect, useState } from "react";
import styled from "styled-components";

const fetchMenu = async () => {
  const response = await fetch(`/api/category/menu`);
  const json = await response.json();
  return json;
};

const SelectBox = styled.div`
  background-color: burlywood;
  padding: 10px;
  margin-right: 10px;
`;

const CategoryBox = ({ setCategory }) => {
  const [categories, setCategories] = useState<any>(null);

  useEffect(() => {
    fetchMenu().then((res) => setCategories(() => res));
  }, []);

  return (
    <>
      <h1>Category</h1>
      <div style={{ display: "flex" }}>
        {categories && (
          <SelectBox onClick={() => setCategory(() => null)}>
            <div>전체</div>
            <div>{categories.totalCount}</div>
          </SelectBox>
        )}
        {categories &&
          categories.menu.map((item) => (
            <SelectBox key={item.idx} onClick={() => setCategory(item)}>
              <div>{item.name}</div>
              <div>{item._count.posts}</div>
            </SelectBox>
          ))}
      </div>
    </>
  );
};

export default CategoryBox;
