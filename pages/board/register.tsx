import { postContent } from "@/components/board/atom";
import TextEditor from "@/components/board/TextEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

const registerPost = async (data) => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const RegisterPost = () => {
  const { register, handleSubmit, setValue } = useForm();
  const postContents = useRecoilValue(postContent);
  const router = useRouter();

  const handleRegister = async (data) => {
    await registerPost(data)
      .then((res) => {
        res.message && router.replace("/");
      })
      .catch((error) => alert(`Error: ${error}`));
  };

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
