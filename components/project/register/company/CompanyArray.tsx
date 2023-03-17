import { useFieldArray } from "react-hook-form";
import styled from "styled-components";
import Company from "./Company";

const CompanyInfo = styled.div``;

const CompanyArray = (props) => {
  const { register, control, errors, setValue } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "company",
  });

  return (
    <CompanyInfo>
      <div>업체 정보 입력</div>
      {fields.map((field, index) => (
        <fieldset key={field.id}>
          <Company index={index} register={register} setValue={setValue} />
          {index > 0 && <button onClick={() => remove(index)}>Remove</button>}
        </fieldset>
      ))}
      {errors.company && (
        <div style={{ color: "red" }}>업체 정보를 모두 입력해주세요</div>
      )}
      <div onClick={() => append({ compName: null })}>Append</div>
    </CompanyInfo>
  );
};

export default CompanyArray;
