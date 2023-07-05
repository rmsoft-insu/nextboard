import dynamic from "next/dynamic";

const Wave = dynamic(() => import("@/components/wave/Wave"), { ssr: false });

const WavePage = () => {
  return (
    <>
      <Wave />
    </>
  );
};

export default WavePage;
