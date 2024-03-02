import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

interface Props {
  id: string;
  value: string;
  action: ActionCreatorWithPayload<[string, string]>;
  taskId?: string;
}

export default function Option({ id, value, action, taskId }: Props) {
  const dispatch = useDispatch();
  return (
    <>
      <li
        className={`
                    h-[40px]
                    px-3
                    flex items-center
        
      `}
        key={id}
        id={id}
        onClick={() => {
          dispatch(action([id, taskId ? taskId : value]));
          if (taskId) localStorage.put = true;
        }}
      >
        {value}
      </li>
    </>
  );
}
