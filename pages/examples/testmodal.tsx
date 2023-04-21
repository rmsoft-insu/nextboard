import Modal from "@/components/common/modal/Modal";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
`;
const Wrapper2 = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ff6a6a;
`;
const Wrapper3 = styled.div`
  width: 100px;
  height: 100px;
  background-color: #5e87f7;
`;

const MoveModal = styled(Modal)`
  position: absolute;
  right: 0;
`;
const MoveModal2 = styled(Modal)`
  position: absolute;
  left: 0;
`;

const Main = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)}>모달열기</div>
      <Modal open={open} setOpen={setOpen}>
        <Wrapper>
          <div>모달이다</div>
          <button onClick={() => setOpen2(true)}>모달 열기</button>
        </Wrapper>
      </Modal>

      <MoveModal open={open2} setOpen={setOpen2}>
        <Wrapper2>
          나도 모달이다
          <button onClick={() => setOpen3(true)}>모달 열기</button>
        </Wrapper2>
      </MoveModal>
      <MoveModal2 open={open3} setOpen={setOpen3}>
        <Wrapper3>찐 모달이다</Wrapper3>
      </MoveModal2>
    </>
  );
};

export default Main;
