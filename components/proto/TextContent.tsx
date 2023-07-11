import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Controller } from "react-hook-form";
import Correction from "./Correction";
import styled from "styled-components";
import { BsXCircle } from "react-icons/bs";

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

const DeleteButton = styled.div`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const InputText = ({ value, name, isOpen, handleClick, ...rest }) => {
  console.log(rest);
  return (
    <>
      {isOpen ? (
        <textarea defaultValue={value} onClick={(e) => e.stopPropagation()} />
      ) : (
        <div onClick={handleClick}>{value}</div>
      )}
    </>
  );
};

const TextContent = ({ index, control, remove, clickedId, setClickedId }) => {
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

export default TextContent;
