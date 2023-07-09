import * as React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

const fieldArrayName = "array";

const DisPlay = ({ control, index }) => {
  const data = useWatch({ control, name: `${fieldArrayName}.${index}` });
  if (!data?.firstName) return null;

  return (
    <div>
      <h3>SubmittedData</h3>
      <span>
        {data?.firstName} {data?.lastName}
      </span>
      <span>{Boolean(data?.working) && data?.working && "I am working"}</span>
    </div>
  );
};

const Edit = ({ update, index, value, control }) => {
  const { register, handleSubmit } = useForm({ defaultValues: value });

  return (
    <div>
      <DisPlay control={control} index={index} />
      <input
        placeholder="first name"
        {...register(`firstName`, { required: true })}
      />
      <input
        placeholder="last name"
        {...register(`lastName`, { required: true })}
      />
      <label>
        Are you working?
        <input type="checkbox" {...register("working")} />`
      </label>

      <button
        type="button"
        onClick={handleSubmit((data) => {
          update(index, data);
        })}
      >
        Submit
      </button>
    </div>
  );
};

const NestedArray = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      [fieldArrayName]: [],
    },
  });
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <fieldset key={field.id}>
            <Edit
              control={control}
              update={update}
              index={index}
              value={field}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </fieldset>
        ))}

        <br />
        <button
          type="button"
          onClick={() => {
            append({ firstName: "", lastName: "", working: false });
          }}
        >
          append
        </button>
        <input type="submit" />
      </form>
    </div>
  );
};

export default NestedArray;
