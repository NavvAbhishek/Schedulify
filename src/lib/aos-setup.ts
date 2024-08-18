// This directive will ensure that the content is client-specific
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const useAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
    });
  }, []);
};

export default useAOS;