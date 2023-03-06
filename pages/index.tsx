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
      </ul>
    </>
  );
}
