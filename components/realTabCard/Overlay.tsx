import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  @media only screen {
    overflow-y: scroll;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 0px;
  }
  @media screen and (min-width: 1280px) {
    justify-content: center;
    align-items: center;
  }
`;

const variants = {
  open: { backgroundColor: "rgba(0,0,0,0.6)" },
  closed: { backgroundColor: "rgba(0,0,0,0)" },
};

const Overlay = ({ children, close }) => {
  return (
    <Wrapper
      onClick={close}
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      variants={variants}
    >
      {children}
    </Wrapper>
  );
};

export default Overlay;
