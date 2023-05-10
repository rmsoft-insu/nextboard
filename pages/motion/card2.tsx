import { Variants, motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { BsChevronDown } from "react-icons/bs";

// 예제에 사용하는 리스트 더미 데이터 입니다.
const listData = [
  { id: 1, name: "one" },
  { id: 2, name: "two" },
  { id: 3, name: "three" },
];

// 목록을 열고 닫는 애니메이션 설정 입니다.
const itemVariants: Variants = {
  open: {
    transformOrigin: "top", //펼쳐지는 애니메이션 시작위치 입니다.
    scaleY: 1,
    opacity: 1,
    height: "80px",
    transition: { duration: 0.2 },
  },
  closed: {
    transformOrigin: "top",
    scaleY: 0,
    opacity: 0,
    height: "0px",
    transition: { duration: 0.2 },
  },
  collapsed: { opacity: 0, height: 0 }, // 컴포넌트가 소멸할 때 적용될 애니메이션 입니다.
};

// 화살표 아이콘의 애니메이션 설정 입니다.
const iconVariants: Variants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const Item = styled.div`
  background-color: red;
  width: 500px;
`;

const MotionDiv = styled(motion.div)`
  background-color: skyblue;
  width: 500px;
`;

const Icon = styled(BsChevronDown)`
  font-size: 20px;
  background-color: orange;
  width: 20px;
  height: 20px;
`;

const Card = ({ setId, item, id }) => {
  //상태를 업데이트해서 화살표가 회전되게 할 useState
  const [open, setOpen] = useState(false);

  // 기존 리스트 요소의 아이디 중 클릭한 아이디와 같은 요소를 찾으면 true 가 되는 변수
  const isOpen = id === item.id;

  const handleClick = () => {
    //리스트를 클릭해서 아이디가 맞는지 확인하고 맞으면 id 를 setId 를 통해 set 해주기
    setId(isOpen ? false : item.id);

    /**
     * 상태가 변화해야 컴포넌트를 렌더링하기때문에
     * 기존의 isOpen 으로 애니메이션이 수행되게 할 수 없습니다
     */
    setOpen(isOpen);
  };

  //isOpen 은 상태가 변화할 때 렌더링을 일으키는 변수가 아니므로
  // isOpen 의 값이 변화할 때 화살표의 방향 전환이 일어날 렌더링을 해줄 open 을
  // 변화시킬 useEffect 입니다.
  useEffect(() => {
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen]);

  return (
    // 제목 파트
    <motion.div
      key={item.id}
      initial={false}
      animate={open ? "open" : "closed"}
    >
      <div onClick={handleClick} style={{ display: "flex" }}>
        제목 클릭
        <motion.div variants={iconVariants}>
          <Icon />
        </motion.div>
      </div>

      {/* 생성되어 펼쳐질 상세 정보 파트 */}
      <AnimatePresence>
        <MotionDiv
          animate={isOpen ? "open" : "closed"}
          exit="collapsed"
          variants={itemVariants}
        >
          <Item>아이템</Item>
        </MotionDiv>
      </AnimatePresence>
    </motion.div>
  );
};

const MotionCard = () => {
  /**
   * id 값의 변화에 따라 각 카드별로 목록을 열고 닫는 상태가 다를 수 있게 이곳에 useState를 만들었습니다.
   * */
  const [id, setId] = useState(null);

  return (
    <>
      {listData.map((item) => (
        <div key={item.id}>
          <Card setId={setId} id={id} item={item} />
        </div>
      ))}
    </>
  );
};

export default MotionCard;
