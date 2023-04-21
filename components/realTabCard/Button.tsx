import styled from "styled-components";

const dummyList = [
  { id: 1, name: "더미 1", count: 3 },
  { id: 2, name: "더미 1", count: 4 },
  { id: 3, name: "더미 1", count: 5 },
];

const Wrapper = styled.div`
  background-color: gray;
  padding: 10px;
`;

const ListWrapper = styled.div`
  display: flex;
  background-color: lemonchiffon;
`;

const CountWrapper = styled.div`
  margin-left: 3rem;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const Button = (props) => {
  const { open } = props;
  return (
    <Wrapper>
      {dummyList.map((item) => (
        <ListWrapper key={item.id}>
          <div>{item.name}</div>
          <CountWrapper onClick={open}>{item.count}</CountWrapper>
        </ListWrapper>
      ))}
    </Wrapper>
  );
};

export default Button;
