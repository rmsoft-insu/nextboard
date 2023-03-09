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
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      field: [{ text: null, file: null }],
    },
  });
  const { fields, append } = useFieldArray({ control, name: "field" });

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
              {...register(`field.${index}.text`)}
              type="text"
              placeholder="텍스트"
            />
            <input {...register(`field.${index}.file`)} type="file" />
          </div>
        ))}

        <div onClick={() => append({ text: null, file: null })}>추가하기</div>
        <button>등록</button>
      </form>
    </div>
  );
};

export default UploadForm;
