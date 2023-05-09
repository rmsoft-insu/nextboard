import { Variants, motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

const listData = [
  { id: 1, name: "one" },
  { id: 2, name: "two" },
  { id: 3, name: "three" },
];

const Item = styled.div`
  background-color: red;
`;
const MotionDiv = styled(motion.div)`
  background-color: skyblue;
`;

const Card = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <div onClick={handleClick}>제목 클릭</div>
      <AnimatePresence>
        <MotionDiv
          initial={false}
          animate={open ? "open" : "closed"}
          variants={itemVariants}
        >
          <Item>아이템</Item>
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

const MotionCard = () => {
  return (
    <>
      {listData.map((item) => (
        <Card key={item.id} />
      ))}
    </>
  );
};

export default MotionCard;
