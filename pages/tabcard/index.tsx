import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "@/components/realTabCard/Button";
import Overlay from "@/components/realTabCard/Overlay";
import Modal from "@/components/realTabCard/Modal";

const TabCard = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    console.log("open");
    setOpen(true);
  };
  const closeModal = () => {
    console.log("close");
    setOpen(false);
  };
  return (
    <div>
      <Button open={openModal} />
      <AnimatePresence>
        {open && (
          <Overlay close={closeModal}>
            <Modal close={closeModal} />
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TabCard;
