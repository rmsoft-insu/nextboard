import { motion } from "framer-motion";
import Image from "next/image";

const Listing = (props) => {
  const { data, open } = props;
  const { imageUrl, price, address, numBedroom, numWashrooms, livingSpace } =
    data;

  return (
    <motion.div>
      <div>
        <div>
          <Image src={imageUrl} alt="real mansion" width={400} height={300} />
        </div>
      </div>
    </motion.div>
  );
};

export default Listing;
