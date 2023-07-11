import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FixedSizeList } from "react-window";
import TextContent from "./TextContent";

const dummy = [
  { id: 1, text: "Text 1", gender: "MALE", correction: true },
  { id: 2, text: "Text 2", gender: "FEMALE", correction: true },
  { id: 3, text: "Text 3", gender: "MALE", correction: false },
  { id: 4, text: "Text 4", gender: "FEMALE", correction: true },
  { id: 5, text: "Text 5", gender: "MALE", correction: false },
  { id: 6, text: "Text 6", gender: "FEMALE", correction: false },
];

const List = () => {
  const [list, setList] = useState(dummy);
  const [clickedId, setClickedId] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      regionList: list,
    },
    shouldUnregister: false,
  });

  const { fields, remove } = useFieldArray({ control, name: "regionList" });

  return (
    <form onSubmit={handleSubmit((data) => console.log("data", data))}>
      <FixedSizeList
        width={400}
        height={500}
        itemSize={40}
        itemCount={fields.length}
        itemData={fields}
        itemKey={(index) => fields[index].id}
      >
        {({ style, index, data }) => {
          return (
            <TextContent
              index={index}
              remove={remove}
              control={control}
              setClickedId={setClickedId}
              clickedId={clickedId}
            />
          );
        }}
      </FixedSizeList>
      <button type="submit">Submit</button>
    </form>
  );
};

const DummyArray = () => {
  return (
    <div>
      <List />
    </div>
  );
};

export default DummyArray;
