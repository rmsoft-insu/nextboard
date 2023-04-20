import styled from "styled-components";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  background-color: blue;
`;

const Modal = ({ close }) => {
  return <Wrapper>모달</Wrapper>;
};

export default Modal;
