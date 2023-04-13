import styled from "styled-components";

const Wrapper = styled.div`
  background-color: red;
  width: 500px;
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  background-color: #8989ff;
  width: 100px;
  overflow: hidden;
  height: auto;
  word-break: break-all;
`;

const AutoHeight = () => {
  return (
    <div>
      <h1>Auto Height</h1>
      <Wrapper>
        <Container>
          12312312312312asdfaasfdasdfdsafasdfasdf3123123123asdfasdfasdf
          dsafasdfasdfasfde dasfasdfsadfasdfasdfasd
        </Container>
        <Container>12312312312312asdfaasfdasd3</Container>
        <Container>123123123=</Container>
      </Wrapper>
    </div>
  );
};

export default AutoHeight;
