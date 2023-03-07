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
      <h1>SortDetailBox</h1>
      {category === "book" && (
        <div>
          {bookKind.map((item) => (
            <div key={item.idx} onClick={() => setKind(() => item.code)}>
              {item.kind}
            </div>
          ))}
        </div>
      )}

      {category === "movie" && (
        <div>
          {movieKind.map((item) => (
            <div key={item.idx} onClick={() => setKind(() => item.code)}>
              <div>{item.kind}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
