import { Variants, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const itemVariants: Variants = {
  open: {
    transformOrigin: "top",
    scaleY: 1,
    transition: { duration: 0.2 },
  },
  closed: {
    transformOrigin: "top",
    height: "0px",
    scaleY: 0,
    transition: { duration: 0.2 },
  },
};

const Box1 = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: red;
`;
const Btn1 = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;

const Motion = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h1>Motion</h1>
      <Btn1 onClick={() => setIsOpen((prev) => !prev)}>클릭</Btn1>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={itemVariants}
        style={{ height: "100px" }}
      >
        <Box1></Box1>
      </motion.div>
      <Box1></Box1>
    </div>
  );
};

export default Motion;
