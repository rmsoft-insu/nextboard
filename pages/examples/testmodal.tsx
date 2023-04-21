import Modal from "@/components/common/modal/Modal";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
`;

const Main = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)}>모달열기</div>
      <Modal open={open} setOpen={setOpen}>
        <Wrapper>모달이다</Wrapper>
      </Modal>
    </>
  );
};

export default Main;
