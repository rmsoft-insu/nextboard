import { useForm } from "react-hook-form";

const fetchPost = async (data) => {
  const response = await fetch("/api/test", {
    method: "POST",
    body: data,
  });
  return response;
};

const UploadForm = () => {
  const { register, handleSubmit } = useForm();

  const formSubmit = async (data) => {
    const formData = new FormData();
    console.log(data.file);
    formData.append("file", data.file[0]);
    formData.append("file", data.file2[0]);
    await fetchPost(formData);
  };

  return (
    <div>
      <h1>Upload Form</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <input {...register("text")} type="text" placeholder="텍스트" />
        <input {...register("file")} type="file" />
        <input {...register("file2")} type="file" />
        <button>등록</button>
      </form>
    </div>
  );
};

export default UploadForm;
