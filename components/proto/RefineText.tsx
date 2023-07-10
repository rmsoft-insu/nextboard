const RefineText = ({ item }) => {
  return (
    <>
      <textarea onClick={(e) => console.log(e)}>{item.text}</textarea>
    </>
  );
};

export default RefineText;
