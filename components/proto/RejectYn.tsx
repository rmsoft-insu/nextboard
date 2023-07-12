import { AiOutlineCheckCircle } from "react-icons/ai";
import styled from "styled-components";

const CheckLabel = styled.label`
  cursor: pointer;
  &:hover {
    color: green;
  }
`;

const CheckContainer = styled.div`
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked + ${CheckLabel} {
    color: green;
  }
`;

const RejectYn = ({ value, name, ...rest }) => {
  return (
    <CheckContainer>
      <input
        type="checkbox"
        defaultChecked={value === "YES" ? true : false}
        onChange={(event) => {
          const { checked } = event.currentTarget;
          rest.onChange(checked ? "YES" : "NO");
        }}
        id={name}
      />
      <CheckLabel htmlFor={name}>
        <AiOutlineCheckCircle size={20} />
      </CheckLabel>
    </CheckContainer>
  );
};

export default RejectYn;
