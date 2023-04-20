import styled from "styled-components";

const ExampleWrapper = styled.div`
  width: 120px;
  height: 100px;
  background-color: skyblue;
`;
const ExampleTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const ExampleComponent = ({ children, ...props }) => {
  return (
    <ExampleWrapper {...props}>
      <ExampleTitle> 예제 입니다.</ExampleTitle>
      {children}
    </ExampleWrapper>
  );
};

export default ExampleComponent;
