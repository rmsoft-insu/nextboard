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
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchMenu().then((res) => setCategoryList(() => res.menu));
  }, []);

  return (
    <>
      <h1>Category</h1>
      <div style={{ display: "flex" }}>
        <SelectBox onClick={() => setCategory(() => null)}>전체</SelectBox>
        {categoryList.map((item) => (
          <SelectBox key={item.idx} onClick={() => setCategory(item)}>
            <div>{item.name}</div>
          </SelectBox>
        ))}
      </div>
    </>
  );
};

export default CategoryBox;
