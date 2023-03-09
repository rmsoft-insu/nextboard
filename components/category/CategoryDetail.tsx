import { useEffect, useState } from "react";
import styled from "styled-components";

const SelectBox = styled.div`
  background-color: burlywood;
  padding: 10px;
  margin-right: 10px;
  margin-top: 10px;
  text-align: center;
`;

const fetchKind = async () => {
  const response = await fetch(`/api/category/kind`);
  const json = await response.json();
  return json;
};

const CategoryDetail = ({ category, setKind }) => {
  const [kindObject, setKindObject] = useState<any>();

  useEffect(() => {
    fetchKind().then((res) => {
      setKindObject(() => res);
    });
  }, []);

  return (
    <div>
      {category === "book" && (
        <div style={{ display: "flex" }}>
          {kindObject &&
            kindObject.book.map((item) => (
              <SelectBox key={item.idx} onClick={() => setKind(() => item)}>
                <div>{item.name}</div>
                <div>{item._count.posts}</div>
              </SelectBox>
            ))}
        </div>
      )}

      {category === "movie" && (
        <div style={{ display: "flex" }}>
          {kindObject &&
            kindObject.movie.map((item) => (
              <SelectBox key={item.idx} onClick={() => setKind(() => item)}>
                <div>{item.name}</div>
                <div>{item._count.posts}</div>
              </SelectBox>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
