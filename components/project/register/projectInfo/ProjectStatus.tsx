import styled from "styled-components";

const StatusType = styled.div`
  width: 100%;
  display: flex;
  input[type="radio"] {
    display: none;
  }
`;

const ProjectStatus = (props) => {
  const { register } = props;
  return (
    <>
      <div>프로젝트 상태</div>
      <StatusType>
        <label>
          <input
            {...register("projectStatus")}
            type="radio"
            value="WAITING"
            checked
          />
          대기
        </label>
        <label>
          <input {...register("projectStatus")} type="radio" value="PROGRESS" />
          진행중
        </label>
        <label>
          <input {...register("projectStatus")} type="radio" value="STOP" />
          중단
        </label>
        <label>
          <input {...register("projectStatus")} type="radio" value="DEADLINE" />
          마감
        </label>
      </StatusType>
    </>
  );
};

export default ProjectStatus;
