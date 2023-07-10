import { AnimatePresence, Variants, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsXCircle } from "react-icons/bs";
import styled from "styled-components";
import RefineMeta from "./RefineMeta";
import RefineText from "./RefineText";

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

const Card = ({ setId, item, id, list, setList }) => {
  const [open, setOpen] = useState(false);
  const isOpen = id === item.id;

  const handleClick = () => {
    setId(isOpen ? false : item.id);
    setOpen(isOpen);
  };

  const listCheck = useCallback(() => {
    setList(() =>
      list.map((value) => {
        if (value.id === item.id) {
          value.correction = !value.correction;
        }
        return value;
      })
    );
  }, [list, setList, item.id]);

  const handleCheck = (event) => {
    event.preventDefault();
    listCheck();
  };

  const handleDelete = (item) => {
    setList(() => list.filter((value) => value.id !== item.id));
  };

  useEffect(() => {
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen]);

  return (
    <div style={{ display: "grid", width: "100%" }}>
      <motion.div
        initial={false}
        key={item.id}
        animate={open ? "open" : "closed"}
        style={{ width: "100%", display: "flex" }}
      >
        <CheckContainer>
          <input
            id={`${item.id}`}
            type="checkbox"
            defaultChecked={item.correction}
          />
          <CheckLabel htmlFor={`${item.id}`} onClick={handleCheck}>
            <AiOutlineCheckCircle size={20} />
          </CheckLabel>
        </CheckContainer>

        <div>00:00 ~ 00:00</div>

        {/* 발화 문장 입력 받는 Component */}

        <textarea onFocus={handleClick} onBlur={handleClick}>
          {item.text}
        </textarea>

        <DeleteButton onClick={() => handleDelete(item)}>
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
          <RefineMeta />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Card;
