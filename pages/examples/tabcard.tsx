import { properties } from "../../constants/data";
import Card from "@/components/tabcard/Card";

const TabCard = () => {
  return (
    <div className="App">
      <div className="properties">
        {properties.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default TabCard;
