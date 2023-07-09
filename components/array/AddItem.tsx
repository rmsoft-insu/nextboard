import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

function removeItem<T>(array: T[], item: T) {
  const index = array.indexOf(item);
  if (index > -1) array.splice(index, 1);
}

const AddItem = () => {
  const count = useRef(0);
  const [items, setItems] = useState([0]);
  const [popLayout, setPopLayout] = useState(false);

  return (
    <div>
      <div>
        <label>
          <code>popLayout</code>
          <input
            type="checkbox"
            checked={popLayout}
            onChange={(event) => setPopLayout(event.currentTarget.checked)}
          />
        </label>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            count.current++;
            setItems([...items, count.current]);
          }}
        >
          Add Item
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {items.map((id) => (
            <motion.li
              key={id}
              layout
              /* initial={{ scale: 0.8, opacity: 0 }} */
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => {
                const newItems = [...items];
                removeItem(newItems, id);
                setItems(newItems);
              }}
            >
              <input type="text" />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default AddItem;
