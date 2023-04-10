import { Variants, motion } from "framer-motion";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

const itemVariants: Variants = {
  open: {
    transformOrigin: "top",
    scaleY: 1,
    height: "80px",
    transition: { duration: 0.2 },
  },
  closed: {
    transformOrigin: "top",
    height: "0px",
    scaleY: 0,
    transition: { duration: 0.2 },
  },
};

const Box1 = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: red;
`;
const Btn1 = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;

const Box2 = styled.div`
  width: 100px;
  height: 100px;
  background-color: pink;
`;
const Box3 = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: skyblue;
`;

const ArrayItem = (props) => {
  const { index } = props;
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <Box2>
      <div onClick={() => setIsOpen((prev) => !prev)}>클릭</div>
      <Box3
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={itemVariants}
      ></Box3>
      <div>123</div>
    </Box2>
  );
};

const Motion = () => {
  const { register, control, handleSubmit } = useForm({});
  const { fields, append, remove } = useFieldArray({ control, name: "test" });
  const [isOpen, setIsOpen] = useState(true);

  const submitEvent = (data) => console.log(data);

  return (
    <div>
      <h1>Motion</h1>
      <Btn1 onClick={() => setIsOpen((prev) => !prev)}>클릭</Btn1>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={itemVariants}
        style={{ height: "100px" }}
      >
        <Box1></Box1>
      </motion.div>
      <form onSubmit={handleSubmit(submitEvent)}>
        {fields.map((item, index) => (
          <div key={item.id}>
            <ArrayItem index={index} />
            <input {...register(`test.${index}.firstName`)} />
          </div>
        ))}
      </form>
      <button onClick={() => append({})}>Append</button>
    </div>
  );
};

export default Motion;
