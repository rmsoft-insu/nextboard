import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)``;
const modalVariants = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.5, delayChildren: 0.2 },
  },
  closed: { opacity: 0 },
};

const Modal = ({ children, close, setValue, ...props }) => {
  return (
    <Wrapper
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
      <div onClick={close}>닫기</div>
      <div onClick={() => setValue("Hi")}>확인</div>
    </Wrapper>
  );
};

export default Modal;
