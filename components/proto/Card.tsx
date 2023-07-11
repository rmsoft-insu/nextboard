import { AnimatePresence, Variants, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsXCircle } from "react-icons/bs";
import styled from "styled-components";
import RefineMeta from "./RefineMeta";

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

const DeleteButton = styled.div`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const Card = (props) => {
  const { setId, item, id, list, setList, setValue, index, remove, ...rest } =
    props;
  console.log("item", item);
  console.log("list", list);
  console.log("rest", rest);
  console.log("id", id);
  const { id: textId, correction, text } = rest.value;
  const [open, setOpen] = useState(false);
  const isOpen = id === textId;

  const handleClick = () => {
    setId(isOpen ? false : textId);
    setOpen(isOpen);
  };

  const listCheck = useCallback(() => {
    setValue();
    setList(() =>
      list.map((value) => {
        if (value.id === textId) {
          value.correction = !value.correction;
        }
        return value;
      })
    );
  }, [list, setList, textId]);

  const handleCheck = (event) => {
    event.preventDefault();
    listCheck();
  };

  const handleDelete = () => remove(index);

  useEffect(() => {
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen]);

  return (
    <div style={{ display: "grid", width: "100%" }}>
      <motion.div
        initial={false}
        key={textId}
        animate={open ? "open" : "closed"}
        style={{ width: "100%", display: "flex" }}
        onClick={isOpen ? handleClick : () => {}}
      >
        <CheckContainer>
          <input
            id={`regionList.${index}.correction`}
            type="checkbox"
            defaultChecked={correction}
          />
          <CheckLabel htmlFor={`${textId}`} onClick={handleCheck}>
            <AiOutlineCheckCircle size={20} />
          </CheckLabel>
        </CheckContainer>

        <div>00:00 ~ 00:00</div>

        {/* 발화 문장 입력 받는 Component */}

        {isOpen ? (
          <textarea defaultValue={text} onClick={(e) => e.stopPropagation()} />
        ) : (
          <div onClick={handleClick}>{text}</div>
        )}

        <DeleteButton onClick={handleDelete}>
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
          {/* Meta 데이터 입력 받는 Component */}
          <RefineMeta id={textId} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Card;
