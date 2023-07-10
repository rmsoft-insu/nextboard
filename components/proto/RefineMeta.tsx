import Select from "react-select";
import WordTag from "./WordTag";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "pink", label: "Pink" },
  { value: "yellow", label: "Yellow" },
];

const RefineMeta = ({ id }) => {
  return (
    <>
      <div>
        <input
          type="radio"
          id={`${id}_MALE`}
          name={`${id}_gender`}
          value="MALE"
        />
        <label htmlFor={`${id}_MALE`}>남성</label>
        <input
          type="radio"
          id={`${id}_FEMALE`}
          name={`${id}_gender`}
          value="FEMALE"
        />
        <label htmlFor={`${id}_FEMALE`}>여성</label>
      </div>
      <div>
        <input type="radio" id="MORNING" name="timeSlot" value="MORNING" />
        <label htmlFor="MORNING">오전</label>
        <input type="radio" id="AFTERNOON" name="timeSlot" value="AFTERNOON" />
        <label htmlFor="AFTERNOON">오후</label>
      </div>
      <div>
        <input type="radio" id="OUTDOOR" name="location" value="OUTDOOR" />
        <label htmlFor="OUTDOOR">실외</label>
        <input type="radio" id="INDOOR" name="location" value="INDOOR" />
        <label htmlFor="INDOOR">실내</label>
      </div>
      <div>
        <div>화자</div>
        <Select options={options} />
      </div>
      <div>
        <div>연령대</div>
        <Select options={options} />
      </div>
      <div>
        <div>
          <WordTag />
        </div>
      </div>
    </>
  );
};

export default RefineMeta;
