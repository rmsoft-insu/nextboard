import styled from "styled-components";
import ProjectName from "./ProjectName";
import ProjectContents from "./ProjectContents";
import ProjectStatus from "./ProjectStatus";
import ProjectDate from "./ProjectDate";
import ProjectType from "./ProjectType";

const InfoWrapper = styled.div`
  background-color: #ffe6e6;
  width: 100%;
  height: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-width: 1000px;
`;

const LeftSideInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RightSideInfo = styled.div`
  margin: 0 auto;
`;

const ProjectInfo = (props) => {
  const { register, errors, clearErrors, setValue, setError } = props;

  return (
    <>
      <InfoWrapper>
        <LeftSideInfo>
          <ProjectName register={register} />
          <ProjectContents register={register} />
        </LeftSideInfo>
        <RightSideInfo>
          <ProjectStatus register={register} />
          <ProjectDate
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            errors={errors}
          />
          <ProjectType register={register} />
        </RightSideInfo>
      </InfoWrapper>
    </>
  );
};

export default ProjectInfo;
