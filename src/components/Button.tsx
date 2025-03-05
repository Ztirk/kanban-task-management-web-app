import { ReactElement } from "react";

interface Props {
  value: string | ReactElement;
  type:
    | "add-new-task"
    | "add-new-subtask"
    | "create-task"
    | "delete"
    | "cancel"
    | "add-new-column";
  onClick: () => void;
  disable?: boolean;
}

export default function Button({ type, onClick, value, disable }: Props) {
  return (
    <div
      className={`
    flex justify-center items-center 
    rounded-full
    whitespace-nowrap
  
    ${disable ? `opacity-25 ` : "cursor-pointer"}
    ${
      type == "add-new-task"
        ? `bg-main-purple 
           hover:bg-main-purple-hover
             min-[376px]:h-[48px] min-[376px]:w-[164px] max-[376px]:h-[32px] max-[376px]:w-[48px]
             max-[376px]:pb-1 max-[376px]:text-[20px]
             text-white
             px-5`
        : type == "add-new-subtask"
        ? `bg-main-purple/10 dark:bg-white
           text-main-purple
             font-bold text-[13px]
             h-[40px]`
        : type == "create-task"
        ? `bg-main-purple 
         hover:bg-main-purple-hover
         h-[40px]
         flex-none
          text-white`
        : type == "delete"
        ? `bg-red
        hover:bg-main-purple-hover
          w-full
         h-[40px]
         text-white`
        : type == "cancel"
        ? `bg-[#635FC7]/10
          hover:bg-main-purple-hover
            w-full
            h-[40px]
          text-main-purple`
        : type == "add-new-column"
        ? `bg-main-purple 
         hover:bg-main-purple-hover
          h-[48px] w-[174px]
          text-white
          px-5`
        : ""
    }

    `}
      onClick={disable ? undefined : onClick}
    >
      {value}
    </div>
  );
}
