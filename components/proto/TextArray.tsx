import { useState, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FixedSizeList } from "react-window";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsXCircle } from "react-icons/bs";
import { AnimatePresence, Variants } from "framer-motion";
import { motion } from "framer-motion";

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

const dummy = [
  { id: 1, text: "Text 1", gender: "MALE", correction: true },
  { id: 2, text: "Text 2", gender: "FEMALE", correction: true },
  { id: 3, text: "Text 3", gender: "MALE", correction: false },
  { id: 4, text: "Text 4", gender: "FEMALE", correction: true },
  { id: 5, text: "Text 5", gender: "MALE", correction: false },
  { id: 6, text: "Text 6", gender: "FEMALE", correction: false },
];

const DeleteButton = styled.div`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const CheckLabel = styled.label`
  cursor: pointer;
  &:hover {
    color: green;
  }
`;

const CheckContainer = styled.div`
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked + ${CheckLabel} {
    color: green;
  }
`;

const Correction = ({ value, name, ...rest }) => {
  return (
    <CheckContainer>
      <input type="checkbox" defaultChecked={value} id={name} {...rest} />
      <CheckLabel htmlFor={name}>
        <AiOutlineCheckCircle size={20} />
      </CheckLabel>
    </CheckContainer>
  );
};

const InputText = ({ value, isOpen, handleClick }) => {
  return (
    <>
      {isOpen ? (
        <textarea defaultValue={value} />
      ) : (
        <div onClick={handleClick}>{value}</div>
      )}
    </>
  );
};

const TextArray = ({ index, control, remove, clickedId, setClickedId }) => {
  const [open, setOpen] = useState(false);
  console.log(clickedId, index);
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
          name={`regionList.${index}.correction`}
          control={control}
        />

        <div>00:00 ~ 00:00</div>

        <Controller
          render={({ field }) => (
            <InputText {...field} isOpen={isOpen} handleClick={handleClick} />
          )}
          name={`regionList.${index}.text`}
          control={control}
        />

        <DeleteButton onClick={() => remove(index)}>
          <BsXCircle size={20} />
        </DeleteButton>
      </motion.div>

      <AnimatePresence>
        <motion.div
          exit="collapsed"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          style={{ width: "100%", backgroundColor: "skyblue" }}
        >
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

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
            <TextArray
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
