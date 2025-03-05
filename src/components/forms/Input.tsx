import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

interface Props {
  id: string;
  placeholder: string;
  action?: ActionCreatorWithPayload<string>;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function Input({
  id,
  placeholder,
  action,
  value,
  onChange,
  required,
}: Props) {
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <input
        className={`border 
                  h-[40px]
                  w-full
                  px-3
                  rounded-sm
                  dark:bg-dark-grey
                  dark:text-white
                  ${required ? "border-red" : "border-[#828FA3]/25"}
      `}
        id={id}
        placeholder={placeholder}
        onChange={(e) =>
          action
            ? dispatch(action(e.currentTarget.value))
            : onChange
            ? onChange(e)
            : undefined
        }
        value={value}
      />

      <div
        className={`absolute right-7 top-2
                    text-red  
                    ${required ? "" : "hidden"}      
        `}
      >
        Can't be empty
      </div>
    </div>
  );
}
