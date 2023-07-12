import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FixedSizeList } from "react-window";
import TextContent from "./TextContent";

const dummy = [
  {
    text: "Text 1",
    rejectYn: "YES",
    meta: {
      speakerIdx: 1,
      gender: "MALE",
      day: "MORNING",
      place: "OUTDOOR",
      speaker: "speaker1",
      ageGroup: "PRE_TEENS",
      wordTags: [
        { type: "NEOLOGISM", word: "Hi", languageType: "KOREAN" },
        { type: "ABBERVIATION", word: "Hello", languageType: "KOREAN" },
      ],
    },
  },
  {
    text: "Text 2",
    rejectYn: "YES",
    meta: {
      speakerIdx: 2,
      gender: "FEMALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "speaker2",
      ageGroup: "TEENAGER_TO_THIRTIES",
      wordTags: [],
    },
  },
  {
    speakerIdx: 3,
    rejectYn: "NO",
    meta: {
      text: "Text 3",
      gender: "MALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "speaker3",
      ageGroup: "THIRTIES_TO_FIFITES",
      wordTags: [],
    },
  },
  {
    speakerIdx: 4,
    rejectYn: "YES",
    meta: {
      text: "Text 4",
      gender: "FEMALE",
      day: "MORNING",
      place: "OUTDOOR",
      speaker: "speaker4",
      ageGroup: "SIXTIES_AND_ABOVE",
      wordTags: [],
    },
  },
  {
    speakerIdx: 5,
    rejectYn: "NO",
    meta: {
      text: "Text 5",
      gender: "MALE",
      day: "AFTERNOON",
      place: "INDOOR",
      speaker: "speaker5",
      ageGroup: "TEENAGER_TO_THIRTIES",
      wordTags: [],
    },
  },
  {
    speakerIdx: 6,
    rejectYn: "NO",
    meta: {
      text: "Text 6",
      gender: "FEMALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "",
      ageGroup: "THIRTIES_TO_FIFITES",
      wordTags: [],
    },
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
    <div>
      <FixedSizeList
        width={400}
        height={500}
        itemSize={40}
        itemCount={fields.length}
        itemData={fields}
        itemKey={(index) => fields[index].speakerIdx}
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
      <button onClick={handleSubmit((data) => console.log(data))}>
        Submit
      </button>
    </div>
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
