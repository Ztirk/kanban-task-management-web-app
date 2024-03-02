import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";


interface Props {
  id: string;
  placeholder: string;
  action: ActionCreatorWithPayload<string>;
  value: string;
}

export default function Textarea({ id, action, placeholder, value }: Props) {
  const dispatch = useDispatch();

  return (
    <textarea
      className={`border border-[#828FA3]/25
                  rounded-sm 
                  resize-none
                  px-3 py-1
                  h-[112px]
    
  `}
      id={id}
      placeholder={placeholder}
      onChange={(e) => dispatch(action(e.currentTarget.value))}
      value={value}
    />
  );
}
