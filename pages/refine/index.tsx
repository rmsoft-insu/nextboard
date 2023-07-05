import dynamic from "next/dynamic";

const RefineVideo = dynamic(
  () => import("@/components/refine/wave/RefineVideo"),
  { ssr: false }
);

const RefinePage = () => {
  return (
    <div>
      <div>Refine</div>
      <RefineVideo />
    </div>
  );
};

export default RefinePage;
