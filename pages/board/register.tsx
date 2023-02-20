import { postContent } from "@/components/board/atom";
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

const handleRegister = (data) => {
  console.log(data);
};

const RegisterPost = () => {
  const { register, handleSubmit, setValue } = useForm();
  const postContents = useRecoilValue(postContent);

  useEffect(() => {
    setValue("postContents", postContents);
  }, [setValue, postContents]);

  return (
    <div>
      <Link href="/">목록보기</Link>
      <h1>등록페이지</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <input
          {...register("postTitle")}
          type="text"
          placeholder="제목을 입력하세요"
        />
        <TextEditor />
        <button>등록하기</button>
      </form>
    </div>
  );
};

export default RegisterPost;
