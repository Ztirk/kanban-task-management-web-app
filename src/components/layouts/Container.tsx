import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  popUp?: true;
  inputNLabel?: true;
}

export default function Container({
  children,
  className,
  popUp,
  inputNLabel,
}: Props) {
  return (
    <div
      className={`
      ${className} 
      ${
        popUp
          ? `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white 
            z-20
            rounded-md
            flex flex-col gap-5
            px-6 py-7
            `
          : ""
      } 
      ${inputNLabel ? "flex flex-col gap-2 dark:border-[#828FA3]" : ""}
      `}
    >
      {children}
    </div>
  );
}
