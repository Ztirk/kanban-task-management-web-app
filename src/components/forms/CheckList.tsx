import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setCheckedSubTask } from "../../store/slices/boardSlice";

interface Props {
  checked: boolean;
  columnId: string;
  taskId: string;
  subTaskId: string;
  subTaskName: string;
}

export default function CheckList({
  checked,
  columnId,
  taskId,
  subTaskId,
  subTaskName,
}: Props) {
  const dispatch = useDispatch();

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    dispatch(setCheckedSubTask([checked, columnId, taskId, subTaskId]));
    localStorage.put = true;
  };

  return (
    <label
      className={`h-[40px] 
                bg-light-grey-light-bg
                hover:bg-main-purple/25
                flex items-center gap-4
                rounded-md
                px-4
                cursor-pointer
                `}
      htmlFor={subTaskId}
      key={subTaskId}
    >
      <input
        className={`
                    h-[16px] aspect-square
                    
      `}
        id={subTaskId}
        type="checkbox"
        checked={checked}
        onChange={handleChecked}
      />
      <span
        className={`font-bold text-[12px]
                    ${
                      checked
                        ? `line-through 
                           text-black/50
                        `
                        : ""
                    }
      `}
      >
        {subTaskName}
      </span>
    </label>
  );
}
