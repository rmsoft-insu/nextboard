import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { MdOutlineInfo } from "react-icons/md";

const InfoLabel = styled(Tooltip)`
  background-color: #3e444e;
  color: #ffffff;
`;

const InfoIconWrapper = styled.span`
  background-color: #000000;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #d8d8d8;
  :hover {
    color: #ffffff;
  }
`;

const ToolTipPage = () => {
  return (
    <>
      <div>
        <InfoIconWrapper data-tooltip-id="app">
          <MdOutlineInfo size={24} />
        </InfoIconWrapper>
      </div>
      <InfoLabel id="app" place="bottom">
        <div>Hello World!</div>
        <div>Hi World</div>
      </InfoLabel>
    </>
  );
};

export default ToolTipPage;
