import Link from "next/link";

const PostDetail = () => {
  return (
    <div>
      <Link href="/">목록보기</Link>
      <h1>글 상세</h1>
      <Link href="/board/edit/1">수정하기</Link>
    </div>
  );
};

export default PostDetail;
