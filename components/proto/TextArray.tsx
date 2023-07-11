import { useState } from "react";
import dynamic from "next/dynamic";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FixedSizeList } from "react-window";
const Card = dynamic(() => import("./Card"));

const dummy = [
  { id: 1, text: "Text 1", correction: true },
  { id: 2, text: "Text 2", correction: true },
  { id: 3, text: "Text 3", correction: false },
  { id: 4, text: "Text 4", correction: true },
  { id: 5, text: "Text 5", correction: false },
  { id: 6, text: "Text 6", correction: false },
];

const List = ({ items }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      regionList: items,
    },
    shouldUnregister: false,
  });

  const { fields, remove } = useFieldArray({ control, name: "regionList" });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FixedSizeList
        width={400}
        height={500}
        itemSize={40}
        itemCount={fields.length}
        itemData={fields}
        itemKey={(index) => fields[index].id}
      >
        {({ style, index, data }) => {
          const defaultValue = getValues("regionList"?.[index]?.text || "");
          return (
            <div style={style}>
              <Controller render={({ field }) => <div>Hi</div>} name />
              <button onClick={() => remove(index)}>remove</button>
            </div>
          );
        }}
      </FixedSizeList>
    </form>
  );
};

const TextArray = () => {
  const [list, setList] = useState(dummy);
  const [id, setId] = useState(null);
  const { handleSubmit, control, getValues, formState } = useForm({
    defaultValues,
  });
  const { fields } = useFieldArray({ control, name: "regionList" });

  // 반려 상태 확인 버튼
  const rejectCheck = () => {
    console.log(list.some((value) => value.correction === true));
  };

  // 반려 상태 설정
  const rejectStatus = list.some((value) => value.correction === true);

  return (
    <div>
      <div>Text Array</div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <FixedSizeList
          width={400}
          height={500}
          itemSize={40}
          itemCount={fields.length}
          itemData={fields}
          itemKey={(index) => fields[index].id}
        >
          {({ style, index, data }) => {
            const defaultValue = getValues;
          }}
        </FixedSizeList>

        {list.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "10px",
              backgroundColor: "bisque",
            }}
          >
            <Card
              setId={setId}
              id={id}
              list={list}
              setList={setList}
              item={item}
            />
          </div>
        ))}
        <button type="button" onClick={() => console.log(list)}>
          버튼
        </button>
        <button type="button" onClick={rejectCheck}>
          반려상태
        </button>
      </form>
    </div>
  );
};

export default TextArray;
