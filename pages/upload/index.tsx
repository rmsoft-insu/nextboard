import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  title: string;
  field: {
    text: string;
    file?: File;
  }[];
};

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
    console.log(data);
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <div>
      <h1>Upload Form</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <input {...register("title")} type="text" placeholder="타이틀" />
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
      </form>
    </div>
  );
};

export default UploadForm;
