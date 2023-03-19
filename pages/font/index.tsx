import { Noto_Sans_KR } from "@next/font/google";
import styled from "styled-components";
import localFont from "@next/font/local";

const notoSansKR = Noto_Sans_KR({
  weight: "700",
  style: ["normal"],
  subsets: ["latin"],
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

const TextBox2 = styled.p``;

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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
        fugiat, repellat corporis et incidunt quia, voluptatum nostrum veritatis
        consectetur, iure repudiandae. Fugiat laborum cum exercitationem, ut
        aspernatur rerum quos laboriosam!
      </TextBox2>
    </div>
  );
};

export default FontTest;
