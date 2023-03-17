import styled from "styled-components";

const TypeWrapper = styled.div`
  width: 100%;
  display: flex;
  input[type="radio"] {
    display: none;
  }
`;

const ProjectType = (props) => {
  const { register } = props;

  return (
    <>
      <div>프로젝트 유형</div>
      <TypeWrapper>
        <label>
          <input {...register("projectType")} type="radio" value="TUTORIAL" />
          튜토리얼
        </label>
        <label>
          <input
            {...register("projectType")}
            type="radio"
            value="REAL"
            checked
          />
          프로젝트
        </label>
      </TypeWrapper>
    </>
  );
};

export default ProjectType;
