import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/realTabCard/Button";
import Overlay from "@/components/realTabCard/Overlay";
import Modal from "@/components/realTabCard/Modal";
import styled from "styled-components";

const ModalWrapper = styled(Modal)`
  width: 500px;
  height: 500px;
  background-color: blue;
`;

const TabCard = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);
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
            <ModalWrapper close={closeModal}>나무처럼</ModalWrapper>
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TabCard;
