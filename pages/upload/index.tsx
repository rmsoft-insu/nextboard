import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

type FormValues = {
  title: string;
  thumbnail: File;
  field: {
    text: string;
    file?: File;
  }[];
};

const FormWrap = styled.form``;

const fetchPost = async (data) => {
  const response = await fetch("/api/test", {
    method: "POST",
    body: data,
  });
  return response;
};

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      field: [{ text: "", file: null }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "field" });

  const formSubmit = async (data) => {
    const formData = new FormData();
    data.field.forEach(function (image) {
      console.log(image.file[0]);
      formData.append("images", image.file[0]);
    });
    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair);
    }
    await fetchPost(formData);
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <div>
      <h1>Upload Form</h1>
      <FormWrap onSubmit={handleSubmit(formSubmit)}>
        <input {...register("title")} type="text" placeholder="타이틀" />
        <input {...register("thumbnail")} type="file" />
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`field.${index}.text`, { required: true })}
              type="text"
              placeholder="텍스트"
            />

            <input
              {...register(`field.${index}.file`, { required: true })}
              type="file"
            />
            {index > 0 && (
              <button onClick={() => remove(index)}>제거하기</button>
            )}
          </div>
        ))}
        {errors.field && (
          <div style={{ color: "red" }}>입력칸을 입력해주세요</div>
        )}
        <div onClick={() => append({ text: null, file: null })}>추가하기</div>

        <button>등록</button>
      </FormWrap>
    </div>
  );
};

export default UploadForm;
