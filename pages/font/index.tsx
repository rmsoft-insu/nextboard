import {
  Noto_Sans_KR,
  Edu_NSW_ACT_Foundation,
  Noto_Sans_JP,
  Rampart_One,
  Noto_Sans_TC,
  ZCOOL_QingKe_HuangYou,
} from "@next/font/google";
import styled from "styled-components";
import localFont from "@next/font/local";

const notoSansKR = Edu_NSW_ACT_Foundation({
  weight: "700",
  style: ["normal"],
  subsets: ["latin"],
});

const notoSansJP = Rampart_One({
  weight: "400",
  style: ["normal"],
  preload: false,
});

const notoSansJP2 = Noto_Sans_JP({
  weight: "400",
  style: ["normal"],
  preload: false,
});

const notoTC = Noto_Sans_TC({
  weight: "400",
  style: ["normal"],
  preload: false,
});

const zcool = ZCOOL_QingKe_HuangYou({
  weight: "400",
  style: ["normal"],
  preload: false,
});

/* const pretendard = localFont({
  src: [
    {
      path: "../../util/fonts/Pretendard-SemiBold.woff2",
    },
  ],
}); */

const TextBox = styled.p`
  font-family: ${notoSansKR.style.fontFamily};
  font-weight: ${notoSansKR.style.fontWeight};
`;

const TextBox2 = styled.p`
  font-family: ${notoSansJP.style.fontFamily};
`;

const FontTest = () => {
  return (
    <div>
      <h1>Font Test</h1>
      <TextBox>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
        fugiat, repellat corporis et incidunt quia, voluptatum nostrum veritatis
        consectetur, iure repudiandae. Fugiat laborum cum exercitationem, ut
        aspernatur rerum quos laboriosam!
      </TextBox>
      <TextBox2>
        人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは
      </TextBox2>
      <p className={notoSansJP2.className}>
        人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは
      </p>
      <p className={notoTC.className}>
        鑑於對人類家庭所有成員的固有尊嚴及其平等的和不移的權利的承認，乃是世界自由、正義與和平的基礎
      </p>
      <p className={zcool.className}>
        鉴于对人权的无视和侮蔑已发展为野蛮暴行,这些暴行玷污了人类的良心,而一个人人享有言论和信仰自由并免予恐惧和匮乏的世界的来临,已被宣布为普通人民的最高愿望
      </p>
    </div>
  );
};

export default FontTest;
