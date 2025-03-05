import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import xMarkIcon from "assets/icon-cross.svg";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

interface Props {
  inputAction?: ActionCreatorWithPayload<[string, string]>;
  deleteAction?: ActionCreatorWithPayload<string>;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onDelete?: (id: string) => void;
  id: string;
  placeholder: string;
}

export default function ReuseList({
  value,
  deleteAction,
  inputAction,
  onChange,
  onDelete,
  id,
  placeholder,
}: Props) {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`flex items-center gap-3
      
                  `}
      >
        <input
          className={`h-[40px] w-full
                  border border-[#828FA3]/25
                  px-3
                  dark:text-white
                      dark:bg-dark-grey
                  `}
          value={value}
          id={id}
          onChange={(e) => {
            onChange
              ? onChange(e, id)
              : inputAction
              ? dispatch(inputAction([id, e.currentTarget.value]))
              : undefined;
          }}
          placeholder={placeholder}
        />
        <img
          className={`cursor-pointer`}
          src={xMarkIcon}
          onClick={() => {
            onDelete
              ? onDelete(id)
              : deleteAction
              ? dispatch(deleteAction(id))
              : undefined;
          }}
        />
      </div>
    </>
  );
}
