import Link from "next/link";
import styled from "styled-components";

const Title = styled.div`
  color: ${(props) => props.theme.colors.blue};
`;

export default function Home() {
  return (
    <>
      <Title>Home</Title>
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
        <li>
          <Link href="/motion">모션</Link>
        </li>
      </ul>
    </>
  );
}
