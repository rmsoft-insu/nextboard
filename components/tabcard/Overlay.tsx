import { motion } from "framer-motion";

const variants = {
  open: { backgroundColor: "rgba(0,0,0,0.6)" },
  closed: { backgroundColor: "rgba(0,0,0,0)" },
};

const Overlay = ({ children, close }) => {
  return (
    <motion.div
      className="overlay"
      onClick={close}
      variants={variants}
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      key="overlay"
    >
      {children}
    </motion.div>
  );
};

export default Overlay;
