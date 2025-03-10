import { DragEvent, useState } from "react";
import ViewTask from "./popups/ViewTask";
import { BoardDetails } from "../interfaces/types";

interface Props {
  task: BoardDetails["Item"]["column"]["L"][0]["M"]["task"]["L"][0]["M"];
  column: BoardDetails["Item"]["column"]["L"][0]["M"];
  onDragStart: (
    e: DragEvent<HTMLDivElement>,
    task_id: string,
    start_column_id: string
  ) => void;
}

export default function Task({ task, column, onDragStart }: Props) {
  const [toggleViewTask, setToggleViewTask] = useState<boolean>(false);
  const [chosenTaskId, setChosenTaskId] = useState<string>("");

  const handleToggleViewTask = () => {
    if (toggleViewTask) {
      setChosenTaskId("");
      setToggleViewTask(false);
    } else setToggleViewTask(true);
  };

  const handleChosenTask = (taskId: string) => {
    setChosenTaskId(taskId);
    handleToggleViewTask();
  };

  return (
    <>
      <ViewTask
        active={toggleViewTask}
        onCancel={handleToggleViewTask}
        taskId={chosenTaskId}
      />

      <div
        className={`bg-white dark:bg-dark-grey
                    h-[88px] w-[280px]
                    shadow-md
                    rounded-md
                    flex flex-col justify-center gap-2
                    pl-5
                    mb-5
                    cursor-pointer
                    text-black
                   hover:text-main-purple
                    `}
        onClick={() => handleChosenTask(task.task_id.S)}
        draggable
        onDragStart={(e) => onDragStart(e, task.task_id.S, column.column_id.S)}
      >
        <h4
          className={`heading-m dark:text-white
                  
      `}
        >
          {task.task_name.S}
        </h4>
        <p className={`body-m text-medium-grey`}>
          {task.sub_task.L.reduce((acc, st) => {
            if (st.M.achieved.BOOL) return acc + 1;
            return acc;
          }, 0)}{" "}
          of {task.sub_task.L.length} substasks
        </p>
      </div>
    </>
  );
}
