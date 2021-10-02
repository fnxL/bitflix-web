function Spacing({ type }) {
  if (type === 'vertical')
    return <div className="flex relative w-full min-w-full md:h-[24px] md:min-h-[24px]" />;

  return <div className="flex h-full relative md:w-[30px] md:min-w-[30px]" />;
}

export default Spacing;
