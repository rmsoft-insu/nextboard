import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Listing from "./Listing";
import Modal from "./Modal";
import Overlay from "./Overlay";

const Card = (props) => {
  const { data } = props;
  const [open, setOpen] = useState(false);

  const openModal = () => {
    console.log("open Click");
    setOpen(true);
  };
  const closeModal = () => {
    console.log("close Click");
    setOpen(false);
  };

  return (
    <>
      <Listing data={data} open={openModal} />
      <AnimatePresence>
        {open && (
          <Overlay close={closeModal}>
            <Modal data={data} close={closeModal} />
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Card;
