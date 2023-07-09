import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FixedSizeList } from "react-window";

const array = [
  { id: 1, name: "Hi-1" },
  { id: 2, name: "Hi-2" },
  { id: 3, name: "Hi-3" },
  { id: 4, name: "Hi-4" },
  { id: 5, name: "Hi-5" },
  { id: 6, name: "Hi-6" },
];

const List = ({ items }) => {
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      test: items,
    },
    shouldUnregister: false,
  });
  const { errors } = formState;
  const { fields, remove } = useFieldArray({ control, name: "test" });

  return (
    <form>
      <FixedSizeList
        width={400}
        height={500}
        itemSize={40}
        itemCount={fields.length}
        itemData={fields}
        itemKey={(i) => fields[i].id}
      >
        {({ style, index, data }) => {
          const defaultValue = getValues("test"?.[index]?.name || "");
          return (
            <div style={style}>
              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.name`}
                defaultValue={defaultValue}
                control={control}
              />
              <button onClick={() => remove(index)}>remove</button>
            </div>
          );
        }}
      </FixedSizeList>
    </form>
  );
};

const DummyArray = () => {
  return (
    <div>
      <div>DummyArray</div>
      <List items={array} />
    </div>
  );
};

export default DummyArray;
