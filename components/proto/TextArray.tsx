import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FixedSizeList } from "react-window";
import TextContent from "./TextContent";

const dummy = [
  {
    speakerIdx: 1,
    text: "Text 1",
    gender: "MALE",
    day: "MORNING",
    place: "OUTDOOR",
    speaker: "speaker1",
    ageGroup: "beforeTwenties",
    rejectYn: "YES",
    wordTags: [
      { type: "NEOLOGISM ", word: "Hi", languageType: "KOREAN" },
      { type: "ABBERVIATION", word: "Hello", languageType: "KOREAN" },
    ],
  },
  {
    speakerIdx: 2,
    text: "Text 2",
    gender: "FEMALE",
    day: "MORNING",
    place: "INDOOR",
    speaker: "speaker2",
    ageGroup: "twenties",
    rejectYn: "YES",
    wordTags: [],
  },
  {
    speakerIdx: 3,
    text: "Text 3",
    gender: "MALE",
    day: "MORNING",
    place: "INDOOR",
    speaker: "speaker3",
    ageGroup: "thirties",
    rejectYn: "NO",
    wordTags: [],
  },
  {
    speakerIdx: 4,
    text: "Text 4",
    gender: "FEMALE",
    day: "MORNING",
    place: "OUTDOOR",
    speaker: "speaker4",
    ageGroup: "fourties",
    rejectYn: "YES",
    wordTags: [],
  },
  {
    speakerIdx: 5,
    text: "Text 5",
    gender: "MALE",
    day: "AFTERNOON",
    place: "INDOOR",
    speaker: "speaker5",
    ageGroup: "fifties",
    rejectYn: "NO",
    wordTags: [],
  },
  {
    speakerIdx: 6,
    text: "Text 6",
    gender: "FEMALE",
    day: "MORNING",
    place: "INDOOR",
    speaker: "",
    ageGroup: "afterSixties",
    rejectYn: "NO",
    wordTags: [],
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
