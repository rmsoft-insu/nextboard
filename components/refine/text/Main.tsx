import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import RefineText from "./RefineText";

const RefineMain = ({ list, onDeleteRegion }) => {
  const [clickedId, setClickedId] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      regionList: [...list],
    },
    shouldUnregister: false,
  });

  const { fields, remove, replace } = useFieldArray({
    control,
    name: "regionList",
  });

  useEffect(() => {
    replace(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

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
            onDeleteRegion={onDeleteRegion}
            watch={watch}
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
