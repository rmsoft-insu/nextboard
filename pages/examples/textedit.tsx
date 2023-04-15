import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";

const Quill = typeof window === "object" ? require("quill") : () => false;
typeof window === "object" &&
  Quill.register("modules/imageResize", ImageResize);
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const defaultModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageResize: {
    modules: ["Resize", "DisplaySize"],
  },

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const TextEdit = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    content && console.log(content);
  }, [content]);

  return (
    <div>
      <h1>Edit</h1>

      <QuillNoSSRWrapper
        modules={defaultModules}
        theme="snow"
        onChange={setContent}
        value={content}
      />
    </div>
  );
};

export default TextEdit;
