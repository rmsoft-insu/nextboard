import ExampleComponent from "@/components/examples/PropExample";
import styled from "styled-components";

const StyleWrapper = styled(ExampleComponent)`
  width: 300px;
  height: 300px;
  background-color: burlywood;
  color: blue;
`;

const StyleProp = () => {
  return (
    <StyleWrapper>
      <div>예제 컨텐츠 입니다.</div>
    </StyleWrapper>
  );
};

export default StyleProp;
