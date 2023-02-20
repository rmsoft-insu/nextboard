import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <div>
        <Link href="/board/1">1번글</Link>
      </div>
      <div>
        <Link href="/board/register">등록하기</Link>
      </div>
    </>
  );
}
