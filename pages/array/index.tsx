import Accordion from "@/components/array/Accordion";
import DummyArray from "@/components/array/DummyArray";
import ExpandArray from "@/components/array/ExpandArray";
import NestedArray from "@/components/array/NestedArray";
import NormalArray from "@/components/array/NormalArray";

const ArrayExample = () => {
  return (
    <>
      <ExpandArray />
      <NestedArray />
      <NormalArray />
      <DummyArray />
      <Accordion />
    </>
  );
};

export default ArrayExample;
