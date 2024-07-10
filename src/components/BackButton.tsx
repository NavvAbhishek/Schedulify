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
        "pink-button flex items-center top-24 left-5 absolute ",
      )}
    >
      <MdArrowBackIos className="transition-all group-hover:-translate-x-1" />
      <span className="text-lg">{title}</span>
    </button>
   </div>
  );
};

export default BackButton;