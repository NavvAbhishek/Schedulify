import { MdArrowBackIos } from 'react-icons/md';
import clsx from 'clsx'; 

type BackButtonProps = {
  title: string;
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ title, className }) => {
  return (
   <div className='group'>
     <button
      className={clsx(
        "pink-button flex items-center p-[6px] top-[120px] left-5 absolute ",
        className
      )}
    >
      <MdArrowBackIos className="transition-all group-hover:-translate-x-1" />
      <span className="text-md">{title}</span>
    </button>
   </div>
  );
};

export default BackButton;