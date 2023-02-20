import Link from "next/link";

const BoardList = () => {
  return (
    <div>
      <h1>글 목록</h1>
      <div>
        <Link href="/board/register">등록하기</Link>
      </div>

      <div>
        <Link href="/board/1">1번글</Link>
      </div>
    </div>
  );
};

export default BoardList;
