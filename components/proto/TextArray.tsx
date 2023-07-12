import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FixedSizeList } from "react-window";
import TextContent from "./TextContent";

const dummy = [
  {
    id: 1,
    text: "Text 1",
    gender: "MALE",
    timeSlot: "MORNING",
    location: "OUTDOOR",
    speaker: "스트리머1",
    ageGroup: "10대",
    correction: true,
  },
  {
    id: 2,
    text: "Text 2",
    gender: "FEMALE",
    timeSlot: "MORNING",
    location: "INDOOR",
    speaker: "스트리머2",
    ageGroup: "20대",
    correction: true,
  },
  {
    id: 3,
    text: "Text 3",
    gender: "MALE",
    timeSlot: "MORNING",
    location: "INDOOR",
    speaker: "스트리머3",
    ageGroup: "30대",
    correction: false,
  },
  {
    id: 4,
    text: "Text 4",
    gender: "FEMALE",
    timeSlot: "MORNING",
    location: "OUTDOOR",
    speaker: "스트리머4",
    ageGroup: "40대",
    correction: true,
  },
  {
    id: 5,
    text: "Text 5",
    gender: "MALE",
    timeSlot: "AFTERNOON",
    location: "INDOOR",
    speaker: "스트리머5",
    ageGroup: "50대",
    correction: false,
  },
  {
    id: 6,
    text: "Text 6",
    gender: "FEMALE",
    timeSlot: "MORNING",
    location: "INDOOR",
    speaker: "스트리머6",
    ageGroup: "60대",
    correction: false,
  },
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
