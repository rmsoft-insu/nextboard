import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

const ProjectDate = (props) => {
  const { setValue, setError, clearErrors, errors, register } = props;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (endDate && startDate >= endDate) {
      setError("startDate", { message: "시작일이 올바르지 않습니다" });
    } else {
      clearErrors("startDate");
    }
  }, [startDate, endDate]);

  useEffect(() => {
    register("projectManager", { required: true });
    register("startDate");
    register("endDate");
  }, [register]);

  return (
    <>
      <div>
        <span>시작일</span>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setValue("startDate", date);
          }}
          locale={ko}
          withPortal
          minDate={new Date()}
          dateFormat="yyyy년 MM월 dd일"
          placeholderText="시작일을 선택하세요"
        />
        {errors.startDate && (
          <span style={{ color: "red" }}>
            <>{errors.startDate.message}</>
          </span>
        )}
      </div>

      <div>
        <span>마감일</span>
        <ReactDatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            setValue("endDate", date);
          }}
          locale={ko}
          withPortal
          minDate={new Date()}
          dateFormat="yyyy년 MM월 dd일"
          placeholderText="마감일을 선택하세요"
        />
      </div>
    </>
  );
};

export default ProjectDate;
