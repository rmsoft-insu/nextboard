import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Controller } from "react-hook-form";
import Correction from "./RejectYn";
import styled from "styled-components";
import { BsXCircle } from "react-icons/bs";
import Select from "react-select";
import WordTags from "./WordTags";

const variants: Variants = {
  open: {
    transformOrigin: "top",
    scaleY: 1,
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2 },
  },
  closed: {
    transformOrigin: "top",
    scaleY: 0,
    opacity: 0,
    height: "0px",
    transition: { duration: 0.2 },
  },
  collapsed: { opacity: 0, height: "0" },
};

const speakers = [
  { value: "speaker1", label: "스트리머1" },
  { value: "speaker2", label: "스트리머2" },
  { value: "speaker3", label: "스트리머3" },
  { value: "speaker4", label: "스트리머4" },
  { value: "speaker5", label: "스트리머5" },
  { value: "speaker6", label: "스트리머6" },
];

const ageGroups = [
  { value: "PRE_TEENS", label: "10대 미만" },
  { value: "TEENAGER_TO_THIRTIES", label: "10대 ~ 30대" },
  { value: "THIRTIES_TO_FIFITES", label: "30대 ~ 50대" },
  { value: "SIXTIES_AND_ABOVE", label: "60대 이상" },
];

const DeleteButton = styled.div`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const InputText = ({ value, name, isOpen, handleClick, ...rest }) => {
  return (
    <>
      {isOpen ? (
        <input
          defaultValue={value}
          id={name}
          onChange={(e) => rest.onChange(e.currentTarget.value.trim())}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div onClick={handleClick}>
          {value.trim() ? value : "문장을 입력하세요"}
        </div>
      )}
    </>
  );
};

const GenderInput = ({ name, value, ...rest }) => {
  return (
    <div>
      <input
        type="radio"
        id={`${name}_MALE`}
        name={name}
        value="MALE"
        defaultChecked={value === "MALE"}
        {...rest}
      />
      <label htmlFor={`${name}_MALE`}>남성</label>
      <input
        type="radio"
        id={`${name}_FEMALE`}
        name={name}
        value="FEMALE"
        defaultChecked={value === "FEMALE"}
        {...rest}
      />
      <label htmlFor={`${name}_FEMALE`}>여성</label>
    </div>
  );
};

const TimeSlotInput = ({ name, value, ...rest }) => {
  return (
    <div>
      <input
        type="radio"
        id={`${name}_MORNING`}
        name={name}
        value="MORNING"
        defaultChecked={value === "MORNING"}
        {...rest}
      />
      <label htmlFor={`${name}_MORNING`}>오전</label>
      <input
        type="radio"
        id={`${name}_AFTERNOON`}
        name={name}
        value="AFTERNOON"
        defaultChecked={value === "AFTERNOON"}
        {...rest}
      />
      <label htmlFor={`${name}_AFTERNOON`}>오후</label>
    </div>
  );
};

const PlaceInput = ({ name, value, ...rest }) => {
  return (
    <div>
      <input
        type="radio"
        id={`${name}_OUTDOOR`}
        name={name}
        value="OUTDOOR"
        defaultChecked={value === "OUTDOOR"}
        {...rest}
      />
      <label htmlFor={`${name}_OUTDOOR`}>실외</label>
      <input
        type="radio"
        id={`${name}_INDOOR`}
        name={name}
        value="INDOOR"
        defaultChecked={value === "INDOOR"}
        {...rest}
      />
      <label htmlFor={`${name}_INDOOR`}>실내</label>
    </div>
  );
};

const SelectSpeaker = ({ name, value, ...rest }) => {
  return (
    <Select
      onChange={(e) => rest.onChange(e.value)}
      options={speakers}
      placeholder="화자선택"
      defaultValue={speakers.filter((speaker) => speaker.value === value)}
      name={name}
    />
  );
};

const SelectAge = ({ name, value, ...rest }) => {
  return (
    <Select
      onChange={(e) => rest.onChange(e.value)}
      options={ageGroups}
      placeholder="연령대선택"
      defaultValue={ageGroups.filter((ageGroup) => ageGroup.value === value)}
      name={name}
    />
  );
};

const RefineText = ({
  index,
  control,
  remove,
  clickedId,
  setClickedId,
  watch,
  onDeleteRegion,
}) => {
  const [open, setOpen] = useState(false);
  const isOpen = clickedId === index;

  const handleClick = () => {
    setClickedId(isOpen ? false : index);
    setOpen(isOpen);
  };

  useEffect(() => {
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen]);

  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        backgroundColor: "bisque",
      }}
    >
      <motion.div
        initial={false}
        key={index}
        animate={open ? "open" : "closed"}
        style={{ width: "100%", display: "flex" }}
        onClick={isOpen ? handleClick : () => {}}
      >
        <Controller
          render={({ field }) => <Correction {...field} />}
          name={`regionList.${index}.rejectYn`}
          control={control}
        />

        <Controller
          render={({ field }) => <div>{field.value}</div>}
          name={`regionList.${index}.timeline`}
          control={control}
        />

        <Controller
          render={({ field }) => (
            <InputText {...field} isOpen={isOpen} handleClick={handleClick} />
          )}
          name={`regionList.${index}.text`}
          control={control}
          rules={{ required: { value: true, message: "문장을 입력하세요" } }}
        />

        <DeleteButton
          onClick={() => {
            const id = watch(`regionList.${index}.id`);
            onDeleteRegion(id);
            //remove(index);
          }}
        >
          <BsXCircle size={20} />
        </DeleteButton>
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          exit="collapsed"
          variants={variants}
          style={{ width: "100%", backgroundColor: "skyblue" }}
        >
          <Controller
            control={control}
            name={`regionList.${index}.meta.gender`}
            render={({ field }) => <GenderInput {...field} />}
          />
          <Controller
            control={control}
            name={`regionList.${index}.meta.day`}
            render={({ field }) => <TimeSlotInput {...field} />}
          />
          <Controller
            control={control}
            name={`regionList.${index}.meta.place`}
            render={({ field }) => <PlaceInput {...field} />}
          />
          <Controller
            control={control}
            name={`regionList.${index}.meta.speaker`}
            render={({ field }) => <SelectSpeaker {...field} />}
          />
          <Controller
            control={control}
            name={`regionList.${index}.meta.ageGroup`}
            render={({ field }) => <SelectAge {...field} />}
          />
          <Controller
            control={control}
            name={`regionList.${index}.meta.wordTags`}
            render={({ field }) => <WordTags {...field} />}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RefineText;