import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

interface Props {
  id: string;
  placeholder: string;
  action?: ActionCreatorWithPayload<string>;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  placeholder,
  action,
  value,
  onChange,
}: Props) {
  const dispatch = useDispatch();

  return (
    <input
      className={`border border-[#828FA3]/25
                  h-[40px]
                  px-3
                  rounded-sm
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
  );
}
