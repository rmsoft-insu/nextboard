import { Variants, motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const itemVariants: Variants = {
  open: {
    transformOrigin: "top",
    scaleY: 1,
    opacity: 1,
    height: "80px",
    transition: { duration: 0.2 },
  },
  closed: {
    transformOrigin: "top",
    scaleY: 0,
    opacity: 0,
    height: "0px",
    transition: { duration: 0.2 },
  },
};

const iconVariants: Variants = {
  open: {
    rotate: 180,
  },
  closed: {
    rotate: 0,
  },
};

const listData = [
  { id: 1, name: "one" },
  { id: 2, name: "two" },
  { id: 3, name: "three" },
];

const Item = styled.div`
  background-color: red;
  width: 500px;
`;
const MotionDiv = styled(motion.div)`
  background-color: skyblue;
  width: 500px;
`;
const MotionIcon = styled(motion.span)`
  background-color: skyblue;
  width: 30px;
  height: 30px;
`;

const Card = ({ setId, item, id }) => {
  const isOpen = id === item.id;
  const handleClick = () => {
    setId(isOpen ? false : item.id);
  };

  return (
    <div key={item.id}>
      <div onClick={handleClick}>
        제목 클릭{" "}
        <MotionIcon
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
        >
          ㅎ
        </MotionIcon>
      </div>
      <AnimatePresence>
        <MotionDiv
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={itemVariants}
        >
          <Item>아이템</Item>
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

const MotionCard = () => {
  const [id, setId] = useState(null);

  return (
    <>
      {listData.map((item) => (
        <div key={item.id}>
          <Card setId={setId} id={id} item={item} />
        </div>
      ))}
    </>
  );
};

export default MotionCard;
