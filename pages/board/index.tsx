import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const fetchList = async () => {
  const response = await fetch("/api/list");
  const json = await response.json();
  return json;
};

const BoardList = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const router = useRouter();
  useEffect(() => {
    fetchList().then((res) => setList(() => res.postList));
  }, []);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((item) => `${item.postIdx}`));
    isCheckAll && setIsCheck([]);
  };

  const handleClick = (event) => {
    const { id, checked } = event.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <div>
      <h1>글 목록</h1>
      <div>
        <Link href="/board/register">등록하기</Link>
      </div>
      {list.length > 0 ? (
        <div>
          <label htmlFor="selectAll">
            <input
              type="checkbox"
              name="selectAll"
              id="selectAll"
              onChange={handleSelectAll}
              checked={isCheckAll}
            />
            전체 선택
          </label>
          {list.map((item) => (
            <div key={item.postIdx}>
              <div>
                <input
                  type="checkbox"
                  id={item.postIdx}
                  onChange={handleClick}
                  checked={isCheck.includes(`${item.postIdx}`)}
                />
                <span onClick={() => router.replace(`/board/${item.postIdx}`)}>
                  {item.postTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BoardList;
