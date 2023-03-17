import styled from "styled-components";

const InputWrapper = styled.div`
  background-color: #ffd5a6;
  padding: 12px;
  input {
    font-size: 1.2rem;
  }
`;

const ProjectName = (props) => {
  const { register } = props;

  return (
    <>
      <InputWrapper>
        <input
          {...register("projectName")}
          type="text"
          placeholder="프로젝트 이름"
        />
      </InputWrapper>
    </>
  );
};

export default ProjectName;
