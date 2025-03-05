import { useEffect } from "react";
import { BoardDetails } from "../../interfaces/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setColumn,
  setDescription,
  setTask,
  setTaskName,
} from "../../store/slices/taskSlice";
import Button from "../Button";
import Label from "../Label";
import Input from "../forms/Input";
import List from "../forms/List";
import Textarea from "../forms/Textarea";
import Container from "../layouts/Container";
import Selector from "../forms/Selector";
import Option from "../forms/Option";
import { addNewTask, deleteTask } from "../../store/slices/boardSlice";

interface Props {
  currentTask:
    | BoardDetails["Item"]["column"]["L"][0]["M"]["task"]["L"][0]["M"]
    | undefined;
  currentColumnId: string;
  currentColumnName: string;
  active: boolean;
  onCancel: () => void;
}

export default function EditTask({
  currentColumnId,
  currentColumnName,
  currentTask,
  active,
  onCancel,
}: Props) {
  const board = useSelector((state: RootState) => state.board);
  const task = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    if (active && currentTask) {
      dispatch(setTask(currentTask));
      dispatch(setColumn([currentColumnId, currentColumnName]));
    }
  }, [currentTask, currentColumnId, currentColumnName, dispatch, active]);

  const saveEditChanges = () => {
    localStorage.put = true;
    dispatch(deleteTask([currentColumnId, currentTask!.task_id.S]));
    dispatch(addNewTask([task.M, task.column_id]));
    onCancel();
  };

  return (
    <>
      <Container className={`h-[675px] w-[480px] dark:text-white
                      dark:bg-dark-grey`} popUp>
        <h2 className={`heading-l`}>Edit Task</h2>
        <Container inputNLabel>
          <Label label="Title" htmlFor="title" />
          <Input
            id="title"
            placeholder="e.g. Take coffee break"
            action={setTaskName}
            value={task.M.task_name.S}
          />
        </Container>
        <Container inputNLabel>
          <Label label="Description" htmlFor="description" />
          <Textarea
            id="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            action={setDescription}
            value={task.M.description.S}
          />
        </Container>
        <Container inputNLabel>
          <Label label="Subtasks" />
          <List value={task.M.sub_task.L} />
        </Container>
        <Container inputNLabel>
          <Label label="Status" />
          <Selector value={task.column_name} active={active}>
            {board.column.L.map((c) => (
              <Option
                id={c.M.column_id.S}
                value={c.M.column_name.S}
                action={setColumn}
              />
            ))}
          </Selector>
        </Container>
        <Button
          type="create-task"
          value="Save Changes"
          onClick={saveEditChanges}
        />
      </Container>
    </>
  );
}
