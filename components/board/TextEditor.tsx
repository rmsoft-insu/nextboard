import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: Quill } = await import("react-quill");
    return function setProps({ forwardedRef, ...props }: any) {
      return <Quill ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const TextEditor = ({ content } = null) => {
  const quillRef = useRef();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
    }),
    []
  );
  return (
    <div>
      <h1>Quill Editor</h1>
      <ReactQuill
        forwardedRef={quillRef}
        formats={formats}
        modules={modules}
        placeholder="내용을 입력하세요..."
        value={content}
      />
    </div>
  );
};

export default TextEditor;
