import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import dynamic from "next/dynamic";

const RefineText = dynamic(() => import("./RefineText"));

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
    text: "Text 3",
    rejectYn: "NO",
    meta: {
      speakerIdx: 3,
      gender: "MALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "speaker3",
      ageGroup: "THIRTIES_TO_FIFITES",
      wordTags: [],
    },
  },
  {
    text: "Text 4",
    rejectYn: "YES",
    meta: {
      speakerIdx: 4,
      gender: "FEMALE",
      day: "MORNING",
      place: "OUTDOOR",
      speaker: "speaker4",
      ageGroup: "SIXTIES_AND_ABOVE",
      wordTags: [],
    },
  },
  {
    rejectYn: "NO",
    text: "Text 5",
    meta: {
      speakerIdx: 5,
      gender: "MALE",
      day: "AFTERNOON",
      place: "INDOOR",
      speaker: "speaker5",
      ageGroup: "TEENAGER_TO_THIRTIES",
      wordTags: [],
    },
  },
  {
    rejectYn: "NO",
    text: "Text 6",
    meta: {
      speakerIdx: 6,
      gender: "FEMALE",
      day: "MORNING",
      place: "INDOOR",
      speaker: "",
      ageGroup: "THIRTIES_TO_FIFITES",
      wordTags: [],
    },
  },
];

const RefineMain = () => {
  const [list, setList] = useState(dummy);
  const [clickedId, setClickedId] = useState(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      regionList: list,
    },
    shouldUnregister: false,
  });

  const { fields, remove } = useFieldArray({ control, name: "regionList" });

  return (
    <div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <RefineText
            index={index}
            remove={remove}
            control={control}
            setClickedId={setClickedId}
            clickedId={clickedId}
          />
        </div>
      ))}
      <button onClick={handleSubmit((data) => console.log(data))}>
        Submit
      </button>
    </div>
  );
};

export default RefineMain;
