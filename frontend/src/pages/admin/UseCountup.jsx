import { useEffect, useState } from "react";


const useCountUp = (end, duration = 4000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    let animationFrame;

    const animate = () => {
      start += increment;
      if (start >= end) {
        setValue(end);
        return;
      }
      setValue(Math.floor(start));
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return value;
};

export default useCountUp;