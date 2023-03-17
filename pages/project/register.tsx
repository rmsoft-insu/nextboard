import styled from "styled-components";
import RegisterMain from "../../components/project/register/RegisterMain";

const Wrapper = styled.div``;

const Container = styled.div`
  display: grid;
  justify-content: center;
`;

const ProjectRegister = () => {
  return (
    <>
      <Wrapper>
        <Container>
          <RegisterMain />
        </Container>
      </Wrapper>
    </>
  );
};
export default ProjectRegister;
