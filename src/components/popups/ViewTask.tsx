import { useDispatch, useSelector } from "react-redux";
import { BackDropT } from "../../interfaces/types";
import Backdrop from "../Backdrop";
import Container from "../layouts/Container";
import { RootState } from "../../store/store";
import Label from "../Label";
import CheckList from "../forms/CheckList";
import Selector from "../forms/Selector";
import Option from "../forms/Option";
import { changeTaskColumn, deleteTask } from "../../store/slices/boardSlice";
import ellipsisIcon from "assets/icon-vertical-ellipsis.svg";
import { useEffect, useState } from "react";
import Button from "../Button";
import EditTask from "./EditTask";

interface Props extends BackDropT {
  taskId: string;
}

interface Column {
  columnId: string;
  columnName: string;
}

export default function ViewTask({ active, onCancel, taskId }: Props) {
  const [toggleEllipsis, setToggleEllipsis] = useState<boolean>(false);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState<boolean>(false);
  const [toggleEditTask, setToggleEditTask] = useState<boolean>(false);
  const [chosenColumn, setChosenColumn] = useState<Column>({
    columnId: "",
    columnName: "",
  });

  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    if (active) {
      const foundColumn: Column = {
        columnId: "",
        columnName: "",
      };
      for (const column of board.column.L) {
        if (foundColumn.columnId) break;
        for (const task of column.M.task.L) {
          if (task.M.task_id.S == taskId) {
            foundColumn.columnId = column.M.column_id.S;
            foundColumn.columnName = column.M.column_name.S;
            break;
          }
        }
      }
      setChosenColumn(foundColumn);
    }
  }, [active, board.column.L, taskId]);

  const chosenTask = board.column.L.find(
    (c) => c.M.column_id.S == chosenColumn.columnId
  )?.M.task.L.find((t) => t.M.task_id.S == taskId)?.M;

  const noOfComplete =
    chosenTask?.sub_task.L.reduce((acc, st) => {
      if (st.M.achieved.BOOL) return acc + 1;
      return acc;
    }, 0) ?? 0;

  const openToggleEllipsis = () => {
    setToggleEllipsis(true);
  };

  const closeToggleEllipsis = () => {
    setToggleEllipsis(false);
  };

  const openConfirmDeleteTask = () => {
    setConfirmDeleteTask(true);
  };

  const closeConfirmDeleteTask = () => {
    setConfirmDeleteTask(false);
    closeToggleEllipsis();
  };

  const openToggleEditTask = () => {
    setToggleEditTask(true);
  };

  // const closeToggleEditTask = () => {
  //   setToggleEditTask(false);
  // };

  const closeAll = () => {
    setToggleEllipsis(false);
    setToggleEditTask(false);
    setConfirmDeleteTask(false);
    onCancel();
  };

  const dTask = () => {
    localStorage.put = true;
    dispatch(deleteTask([chosenColumn.columnId, taskId]));
    closeAll();
  };

  const noOfSubTasks = chosenTask?.sub_task.L.length ?? 0;
  return (
    <>
      <Backdrop
        active={active}
        onClick={() => {
          onCancel();
          closeAll();
        }}
        z={"z-20"}
        opacity={"opacity-50"}
      />
      {confirmDeleteTask ? (
        <Container className={`w-[480px] h-[229px] `} popUp>
          <h2
            className={`heading-l
                        text-red
          `}
          >
            Delete this task?
          </h2>
          <p
            className={`body-l
                        text-medium-grey
            `}
          >
            Are you sure you want to delete the ‘{chosenTask?.task_name.S}’ task
            and its subtasks? This action cannot be reversed.
          </p>
          <div className={`flex justify-center gap-5`}>
            <Button value="Delete" type="delete" onClick={dTask} />
            <Button
              value="Cancel"
              type="cancel"
              onClick={closeConfirmDeleteTask}
            />
          </div>
        </Container>
      ) : toggleEditTask ? (
        <EditTask
          currentColumnId={chosenColumn.columnId}
          currentColumnName={chosenColumn.columnName}
          currentTask={chosenTask}
          active={toggleEditTask}
          onCancel={closeAll}
        />
      ) : (
        <Container
          className={`h-[523px] w-[480px] dark:bg-dark-grey
        
        ${active ? "" : "hidden"}`}
          popUp
        >
          <Backdrop
            active={toggleEllipsis}
            onClick={closeToggleEllipsis}
            z={"z-20"}
            opacity={"opacity-0"}
          />
          {chosenTask ? (
            <>
              <div
                className={`heading-l
                        flex justify-between items-center
            `}
              >
                <h2 className="dark:text-white">{chosenTask.task_name.S}</h2>

                <div
                  className={`cursor-pointer  z-30
                                relative`}
                >
                  <img src={ellipsisIcon} onClick={openToggleEllipsis} />
                  <ul
                    className={`
                                
                                absolute top-10 left-1/2 -translate-x-1/2 
                                whitespace-nowrap
                                body-l text-medium-grey
                                h-[80px] w-[192px]
                                bg-white
                                shadow rounded-md
                                flex flex-col justify-center gap-2
                                pl-4
                ${toggleEllipsis ? `` : `hidden`}`}
                  >
                    <li onClick={openToggleEditTask}>Edit Task</li>
                    <li className="text-red" onClick={openConfirmDeleteTask}>
                      Delete Task
                    </li>
                  </ul>
                </div>
              </div>
              <p
                className={`body-l text-medium-grey
              `}
              >
                {chosenTask.description.S}
              </p>
              <Container inputNLabel>
                <Label
                  label={`Subtasks (${noOfComplete} of ${noOfSubTasks})`}
                />
                {chosenTask.sub_task.L.map((st) => (
                  <CheckList
                    columnId={chosenColumn.columnId}
                    taskId={taskId}
                    subTaskId={st.M.sub_task_id.S}
                    checked={st.M.achieved.BOOL}
                    subTaskName={st.M.sub_task_name.S}
                  />
                ))}
              </Container>
              <Container inputNLabel>
                <Label label="Status" />
                <Selector value={chosenColumn.columnName} active={active}>
                  {board.column.L.map((c) => (
                    <Option
                      id={c.M.column_id.S}
                      value={c.M.column_name.S}
                      taskId={taskId}
                      action={changeTaskColumn}
                    />
                  ))}
                </Selector>
              </Container>
            </>
          ) : (
            <></>
          )}
        </Container>
      )}
    </>
  );
}
