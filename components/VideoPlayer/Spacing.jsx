function Spacing({ type }) {
  if (type === 'vertical')
    return <div className="flex relative w-full min-w-full h-[30px] min-h-[30px]" />;

  return <div className="flex h-full relative w-[30px] min-w-[30px]" />;
}

export default Spacing;
