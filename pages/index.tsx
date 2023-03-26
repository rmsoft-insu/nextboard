import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/board">게시판</Link>
        </li>
        <li>
          <Link href="/upload">업로드</Link>
        </li>
        <li>
          <Link href="/category">카테고리</Link>
        </li>
        <li>
          <Link href="/project/register">프로젝트</Link>
        </li>
        <li>
          <Link href="/font">폰트</Link>
        </li>
        <li>
          <Link href="/dummy">JSON-SERVER</Link>
        </li>
      </ul>
    </>
  );
}
