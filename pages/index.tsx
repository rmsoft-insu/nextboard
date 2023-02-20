import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/board">게시판</Link>
    </>
  );
}
