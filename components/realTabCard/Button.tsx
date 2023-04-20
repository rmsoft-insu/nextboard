import styled from "styled-components";

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;

const Button = (props) => {
  const { open } = props;
  return <Wrapper onClick={open}>Button</Wrapper>;
};

export default Button;
