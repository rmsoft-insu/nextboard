import styled from "styled-components";

const SelectBox = styled.div`
  background-color: burlywood;
  padding: 10px;
  margin-right: 10px;
  margin-top: 10px;
`;

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

const CategoryDetail = ({ category, setKind }) => {
  return (
    <div>
      {category === "book" && (
        <div style={{ display: "flex" }}>
          {bookKind.map((item) => (
            <SelectBox key={item.idx} onClick={() => setKind(() => item.code)}>
              {item.kind}
            </SelectBox>
          ))}
        </div>
      )}

      {category === "movie" && (
        <div style={{ display: "flex" }}>
          {movieKind.map((item) => (
            <SelectBox key={item.idx} onClick={() => setKind(() => item.code)}>
              <div>{item.kind}</div>
            </SelectBox>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
