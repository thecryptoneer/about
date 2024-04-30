import { useEffect, useState } from "react";
const useDoubleClick = ({
  ref,
  latency = 300,
  onSingleClick = () => {},
  onDoubleClick = () => {},
}: any) => {
  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    if (clickCount === 1) {
      const timer: any = setTimeout(() => {
        if (clickCount === 1) {
          onSingleClick();
        }
        setClickCount(0);
      }, latency);

      return () => clearTimeout(timer);
    } else if (clickCount === 2) {
      onDoubleClick();
      setClickCount(0);
    }
  }, [clickCount]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleClick = (): void => {
      setClickCount((prev) => prev + 1);
    };

    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("click", handleClick);
    };
  }, [ref]);
};

export default useDoubleClick;
