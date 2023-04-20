import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = (props) => {
  const { data, closeModal } = props;
  const {
    imageUrl,
    price,
    address,
    description,
    numBedroom,
    numWashrooms,
    livingSpace,
  } = data;

  const modalVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: { opacity: 0 },
  };

  const imageVariants = {
    open: { opacity: 1, y: "0vh" },
    closed: { opacity: 0, y: "-10vh" },
  };

  const modalInfoVariants = {
    open: { opacity: 1, transition: { staggerChildren: 0.2 } },
    closed: { opacity: 0 },
  };

  const modalRowVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "10%" },
  };

  return (
    <motion.div
      className="modal"
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.img
        className="modal__image"
        alt=""
        src={imageUrl}
        variants={imageVariants}
      />
      <motion.div variants={modalInfoVariants}></motion.div>
    </motion.div>
  );
};

export default Modal;
