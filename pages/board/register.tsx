import TextEditor from "@/components/board/TextEditor";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

const registerPost = async (data) => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

const RegisterPost = () => {
  return (
    <div>
      <Link href="/">목록보기</Link>
      <h1>등록하기</h1>
      <TextEditor />
    </div>
  );
};

export default RegisterPost;
