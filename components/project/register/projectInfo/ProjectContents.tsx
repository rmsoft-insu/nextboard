import styled from "styled-components";

const InputWrapper = styled.div`
  background-color: #ffd5a6;
  padding: 10px;
  input {
    font-size: 1.2rem;
  }
`;

const ProjectContents = (props) => {
  const { register } = props;

  return (
    <>
      <InputWrapper>
        <input
          {...register("projectContents")}
          type="text"
          placeholder="프로젝트 내용 설명"
        />
      </InputWrapper>
    </>
  );
};

export default ProjectContents;
