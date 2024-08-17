import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface PrintProps {
  contentRef: React.RefObject<HTMLDivElement>;
  text: string;
}

const PrintAsPdf = ({ contentRef,text }: PrintProps) => {
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });
  return (
    <div className="flex gap-2 justify-end text-xl cursor-pointer mr-5">
      <h2 className=" text-dark-blue font-bold ">{text}</h2>
      <button
        className="cursor-pointer"
        onClick={handlePrint}
        title="Print Classes"
      >
        🖨️
      </button>
    </div>
  );
};

export default PrintAsPdf;
