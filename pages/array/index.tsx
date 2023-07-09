import * as React from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  useWatch,
  FieldValues,
} from "react-hook-form";

let renderCount = 0;

const ConditionalInput = ({ control, index, field }) => {
  const value = useWatch({ name: "test", control });

  return (
    <Controller
      control={control}
      name={`test.${index}.firstName`}
      render={({ field }) =>
        value?.[index]?.checkbox === "on" ? <input {...field} /> : null
      }
      defaultValue={field.firstName}
    />
  );
};

const ArrayExample = () => {
  const { handleSubmit, control, register } = useForm();
  const { fields, append, prepend } = useFieldArray({ control, name: "test" });
  const onSubmit = (data) => console.log(data);
  renderCount++;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field: FieldValues, index) => {
          const id = `test.${index}.checkbox`;
          return (
            <div key={field.id}>
              <section>
                <label htmlFor={id}>Show Input</label>
                <input
                  type="checkbox"
                  value="on"
                  id={id}
                  {...register(id)}
                  defaultChecked={field.checked}
                />
                <ConditionalInput {...{ control, index, field }} />
              </section>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => append({ firstName: "append value" })}
        >
          append
        </button>
        <input type="submit" />
      </form>
    </div>
  );
};

export default ArrayExample;
