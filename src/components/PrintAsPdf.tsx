import React, { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

interface PrintProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

const PrintAsPdf = ({ contentRef }: PrintProps) => {
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });
  return (
    <div className="flex gap-2 justify-end text-xl cursor-pointer mt-3 mr-5">
      <h2 className=" text-dark-blue font-bold ">Print Timetable</h2>
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
