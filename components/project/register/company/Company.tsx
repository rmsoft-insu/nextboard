import { useState, useEffect } from "react";
import KakaoAddress from "../../../common/KaKaoAddress";
import styled from "styled-components";

const CompanyWrapper = styled.div`
  height: 240px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #dfecff;
`;

const LeftSideBox = styled.div`
  background-color: yellowgreen;
`;

const Company = ({ index, register, setValue }) => {
  const [address, setAddress] = useState(null);
  const [amount, setAmount] = useState("");

  const inputPriceFormat = (price) => {
    if (parseInt(price) < 0 || parseInt(price) === 0) {
      return 0;
    }

    const comma = (price) => {
      price = String(price);
      return price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (price) => {
      price = String(price);
      return price.replace(/[^\d]+/g, "");
    };
    let formatNum = uncomma(price);
    setValue(`company[${index}].businessAmount`, formatNum);
    return comma(uncomma(price));
  };

  useEffect(() => {
    register(`company[${index}].compAddress`);
    register(`company[${index}].fileIdx`);
    setValue(`company[${index}].fileIdx`, index);
  }, [register]);

  useEffect(() => {
    if (address) {
      setValue(`company[${index}].compAddress`, address);
    }
  }, [address]);

  useEffect(() => {
    if (amount) {
      register(`company[${index}].businessAmount`);
      const uncomma = (price) => {
        price = String(price);
        return price.replace(/[^\d]+/g, "");
      };
      setValue(`company[${index}].businessAmount`, uncomma(amount));
    }
  }, [amount]);

  return (
    <CompanyWrapper>
      <LeftSideBox>
        <div>
          <input
            {...register(`company[${index}].compName`)}
            placeholder="업체 이름"
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            placeholder="대표자 이름"
            {...register(`company[${index}].ceoName`)}
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            placeholder="담당자 이름"
            {...register(`company[${index}].compManager`)}
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            placeholder="산정 금액"
            autoComplete="off"
            onChange={(e) => setAmount(inputPriceFormat(e.target.value))}
            value={amount}
          />
        </div>
        <input {...register(`company[${index}].stampImg`)} type="file" />
      </LeftSideBox>
      <div>
        <div>
          <div>{address}</div>
          <KakaoAddress setAddress={setAddress} />
        </div>
        <div>
          <input
            type="number"
            placeholder="대표 연락처"
            autoComplete="off"
            {...register(`company[${index}].compPhone`)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="담당자 연락처"
            autoComplete="off"
            {...register(`company[${index}].compManagerPhone`)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="FAX 번호"
            autoComplete="off"
            {...register(`company[${index}].compFax`)}
          />
        </div>
        <div>
          <label>
            <input
              type="radio"
              placeholder="MainCompanyType"
              autoComplete="off"
              {...register(`company[${index}].projectMainCompanyType`)}
              value="GENERAL"
              checked
            />
            일반
          </label>
          <label>
            <input
              type="radio"
              placeholder="MainCompanyType"
              autoComplete="off"
              {...register(`company[${index}].projectMainCompanyType`)}
              value="TYPICAL"
            />
            대표
          </label>
        </div>
      </div>
    </CompanyWrapper>
  );
};

export default Company;
