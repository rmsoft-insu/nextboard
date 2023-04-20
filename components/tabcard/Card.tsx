import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Listing from "./Listing";

const Card = (props) => {
  const { data } = props;
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Listing data={data} open={openModal} />
      <AnimatePresence></AnimatePresence>
    </>
  );
};

export default Card;
