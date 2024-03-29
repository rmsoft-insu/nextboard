import { postContent } from "@/components/board/atom";
import TextEditor from "@/components/board/TextEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
const Quill = typeof window === "object" ? require("quill") : () => false;

interface Text {
  postTitle: string;
  postContent: string;
}

const fetchPost = async (idx) => {
  const response = await fetch(`/api/detail/${idx}`);
  const json = await response.json();
  return json;
};

const editPost = async (data, idx) => {
  const response = await fetch(`/api/edit/${idx}`, {
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

const EditPost = () => {
  const router = useRouter();
  const [oldContent, setOldContent] = useState();
  const [newContent, setNewContent] = useRecoilState(postContent);
  const [page, setPage] = useState<Text>({
    postTitle: "",
    postContent: "",
  });

  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if (router) {
      const idx = parseInt(router.query.idx as string);
      fetchPost(idx)
        .then((res) => res.result && setPage(() => res.result[0]))
        .catch((error) => {
          alert(`Error: ${error}`);
          router.replace("/");
        });
    }
  }, [router]);

  useEffect(() => {
    if (page.postContent !== "") {
      const json = JSON.parse(page.postContent);
      const quillGetHTML = (inputDelta) => {
        const quill = new Quill(document.createElement("div"));
        quill.setContents(inputDelta);
        return quill.root.innerHTML;
      };
      setOldContent(() => quillGetHTML(json));
      setValue("postTitle", page.postTitle);
    }
  }, [page, setValue, setOldContent]);

  useEffect(() => {
    if (newContent) {
      setValue("postContent", newContent);
    } else {
      setValue("postContent", oldContent);
    }
  }, [newContent, setValue, oldContent]);

  const handleEdit = async (data) => {
    const { idx } = router.query;
    const editedData = {
      postIdx: parseInt(idx as string),
      ...data,
    };
    await editPost(editedData, idx)
      .then((res) => {
        res.message && router.replace("/");
      })
      .catch((error) => alert(`Error:${error}`));
  };

  return (
    <div>
      <Link href="/board">목록보기</Link>
      <h1>글 수정</h1>
      <form onSubmit={handleSubmit(handleEdit)}>
        <input {...register("postTitle")} type="text" />
        <TextEditor
          setContent={setNewContent}
          content={oldContent}
          setImage={setImage}
        />
        <button>수정하기</button>
      </form>
    </div>
  );
};

export default EditPost;
