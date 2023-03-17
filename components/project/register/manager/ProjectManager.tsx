import styled from "styled-components";
import { useState, useEffect } from "react";

const ManagerWrapper = styled.div`
  height: 400px;
  background-color: blanchedalmond;
`;

const ManagerContainer = styled.div`
  display: flex;
  div {
    margin-right: 1rem;
  }
`;

const fetchList = async () => {
  const API = process.env.NEXT_PUBLIC_PROJECT_API;
  const token = localStorage.getItem("accessToken");
  const response = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json;
};

const ProjectManager = ({ setProjectAdmin, error }) => {
  const [projectList, setProjectList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const handleClick = (event) => {
    const { id, checked } = event.target;
    const content = event.target.labels[0].textContent;
    setIsCheck([...isCheck, { userIdx: id, name: content }]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item.userIdx !== id));
    }
  };

  const viewData = () => {
    if (isCheck) {
      const idxList = isCheck.map((item) => {
        return { userIdx: item.userIdx };
      });

      setSelectedList(() => isCheck);
      setProjectAdmin("projectManager", idxList);
    }
  };

  useEffect(() => {
    fetchList().then((res) => {
      setProjectList(() => res.resultData.itemList);
    });
  }, []);

  return (
    <ManagerWrapper>
      <div>
        <div>프로젝트 관리자</div>
        <input type="text" placeholder="관리자 검색" />
      </div>

      <ManagerContainer>
        <div>
          <div>관리자 목록</div>
          {projectList &&
            projectList.map((item) => (
              <div key={item.userIdx}>
                <label htmlFor={`${item.userIdx}`}>
                  <input
                    id={`${item.userIdx}`}
                    type="checkbox"
                    onChange={handleClick}
                    checked={isCheck.some(
                      (value) => value.userIdx === `${item.userIdx}`
                    )}
                  />
                  {item.userName}
                </label>
              </div>
            ))}
        </div>

        <div>
          <div onClick={viewData}>🔜선택🔜</div>
        </div>

        <div>
          <div>선택된 관리자 리스트</div>
          {selectedList.map((item) => (
            <div key={item.userIdx}>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </ManagerContainer>
      {error && (
        <div style={{ color: "red" }}>프로젝트 관리자를 지정해주세요</div>
      )}
    </ManagerWrapper>
  );
};

export default ProjectManager;
