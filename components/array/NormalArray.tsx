import React from "react";
import {
  useForm,
  useWatch,
  useFieldArray,
  Control,
  UseFormRegister,
} from "react-hook-form";

type FormValues = {
  data: { name: string }[];
};

const ConditionField = ({
  control,
  index,
  register,
}: {
  control: Control<FormValues>;
  index: number;
  register: UseFormRegister<FormValues>;
}) => {
  const output = useWatch({ name: "data", control });

  return (
    <>
      {/* Required shouldUnregister: false */}
      {output[index]?.name === "bill" && (
        <input {...register(`data.${index}.name` as const)} />
      )}

      {/* doesn't required shouldUnregister: false */}
      <input
        name={`data[${index}].easyConditional`}
        style={{ display: output[index]?.name === "bill" ? "block" : "none" }}
      />
    </>
  );
};

const NormalArray = () => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      data: [{ name: "test" }, { name: "test1" }, { name: "test2" }],
    },
    mode: "onSubmit",
  });

  const { fields } = useFieldArray({ control, name: "data" });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`data.${index}.name`)} />
          <ConditionField register={register} control={control} index={index} />
        </div>
      ))}
      <input type="submit" />
    </form>
  );
};

export default NormalArray;
