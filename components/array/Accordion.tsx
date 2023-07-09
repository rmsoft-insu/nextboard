import { AnimatePresence, Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";

const dummyList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const variants: Variants = {
  open: {
    transformOrigin: "top",
    scaleY: 1,
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2 },
  },
  closed: {
    transformOrigin: "top",
    scaleY: 0,
    opacity: 0,
    height: "0px",
    transition: { duration: 0.2 },
  },
  collapsed: { opacity: 0, height: "0" },
};

const Card = ({ setId, item, id }) => {
  const [open, setOpen] = useState(false);

  const isOpen = id === item.id;
  const handleClick = () => {
    setId(isOpen ? false : item.id);
    setOpen(isOpen);
  };

  useEffect(() => {
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen]);

  return (
    <motion.div
      initial={false}
      key={item.id}
      animate={open ? "open" : "closed"}
    >
      <div onClick={handleClick}>Title</div>
      <AnimatePresence>
        <motion.div
          exit="collapsed"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={variants}
        >
          <div>Contents</div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const Accordion = () => {
  const [id, setId] = useState(null);

  return (
    <div>
      <div>
        {dummyList.map((item) => (
          <div key={item.id}>
            <Card setId={setId} id={id} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
