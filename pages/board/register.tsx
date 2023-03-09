import { postContent } from "@/components/board/atom";
import TextEditor from "@/components/board/TextEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const EditorWrapper = styled.div`
  min-height: 250px;
`;

const registerPost = async (data) => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const setImage = async (formData: FormData) => {
  const response = await fetch("/api/imageinsert", {
    method: "POST",
    body: formData,
  });
  return response;
};

const RegisterPost = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const setDelta = useSetRecoilState(postContent);
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
    register("postContents", { required: "내용을 입력하세요" });
  }, [register]);

  useEffect(() => {
    setValue("postContents", postContents);
  }, [setValue, postContents]);

  return (
    <div>
      <Link href="/board">목록보기</Link>
      <h1>등록페이지</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <input
          {...register("postTitle", { required: true })}
          type="text"
          placeholder="제목을 입력하세요"
        />
        <EditorWrapper>
          <TextEditor setContent={setDelta} setImage={setImage} height={200} />
        </EditorWrapper>
        <span>{errors.postContents && "내용을 입력하세요."}</span>
        <button>등록하기</button>
      </form>
    </div>
  );
};

export default RegisterPost;
