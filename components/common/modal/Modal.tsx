import { AnimatePresence, motion } from "framer-motion";
import Overlay from "./Overlay";

const modalVariants = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.5, delayChildren: 0.2 },
  },
  closed: { opacity: 0 },
};

const Modal = (props) => {
  const { children, setOpen, open, ...others } = props;

  return (
    <AnimatePresence>
      {open && (
        <Overlay open={setOpen}>
          <motion.div
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            {...others}
          >
            {children}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
