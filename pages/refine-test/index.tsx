import { useRouter } from "next/router";
import { useEffect } from "react";

export function getServerSideProps({ query: { workIdx, idx } }) {
  return {
    props: {
      workIdx,
      idx,
    },
  };
}

// 탭 닫기, 새로고침 방지 이벤트 함수
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = ""; //Chrome에서 동작하도록; deprecated
};

// 메인 함수
const RefineTest = () => {
  const router = useRouter();

  // 윈도우 닫기, 뒤로가기, 새로고침 방지 useEffect
  useEffect(() => {
    // 뒤로가기 방지
    router.beforePopState(({ url, as, options }) => {
      if (as !== null) {
        window.history.pushState("", "");
        window.location.href = as;
        router.push(router.asPath);
        return false;
      }
      //list.length === 0 && resetCompleteCount();
      router.reload();
      return true;
    });

    // 새로고침, 윈도우 닫기 방지
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  return <div>Test Refine</div>;
};

export default RefineTest;
