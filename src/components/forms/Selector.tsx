import { ReactNode, useEffect, useState } from "react";
import chevronDown from "assets/icon-chevron-down.svg";
import chevronUp from "assets/icon-chevron-up.svg";
interface Props {
  value: string;
  active: boolean;
  children: ReactNode;
  required?: boolean;
}

export default function Selector({ value, active, children, required }: Props) {
  const [toggleSelect, setToggleSelect] = useState<boolean>(false);

  useEffect(() => {
    setToggleSelect(false);
  }, [active]);

  const handleDismissBackdrop = () => {
    setToggleSelect((prev) => !prev);
  };

  return (
    <>
      <div
        className={`
                    absolute top-0 left-0
                    bg-black/0
                    h-full w-full
                    ${toggleSelect ? "" : "hidden"}
                    `}
        onClick={handleDismissBackdrop}
      />
      <div
        className={`relative 
                    cursor-pointer
        `}
        onClick={handleDismissBackdrop}
      >
        <div
          className={`h-[40px]
                        border 
                        flex justify-between items-center
                        px-3
                        rounded-md
                        ${
                          required
                            ? `border-red
                                after:content-["Can't_be_empty"]
                                after:absolute after:right-8
                                after:text-red
                            `
                            : "border-[#828FA3]/25"
                        }
                        `}
        >
          <p className="dark:text-white">{value}</p>
          <img src={toggleSelect ? chevronUp : chevronDown} />
        </div>
        <ul
          className={`absolute top-[45px] left-0
                  w-full
                  bg-white
                  shadow
                  rounded-[8px]
                  ${toggleSelect ? "" : "hidden"}
    `}
        >
          {children}
        </ul>
      </div>
    </>
  );
}
