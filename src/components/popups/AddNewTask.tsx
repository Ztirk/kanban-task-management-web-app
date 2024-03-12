import { useDispatch, useSelector } from "react-redux";
import { BackDropT } from "../../interfaces/types";
import Backdrop from "../Backdrop";
import Button from "../Button";
import Input from "../forms/Input";
import List from "../forms/List";
import Textarea from "../forms/Textarea";
import Label from "../Label";
import Container from "../layouts/Container";
import {
  setColumn,
  setDescription,
  setTaskId,
  setTaskName,
} from "../../store/slices/taskSlice";
import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import Selector from "../forms/Selector";
import Option from "../forms/Option";
import { addNewTask } from "../../store/slices/boardSlice";
import { v4 as uuidv4 } from "uuid";

interface Props extends BackDropT {}

export default function AddNewTask({ active, onCancel }: Props) {
  const task = useSelector((state: RootState) => state.task);
  const board = useSelector((state: RootState) => state.board);
  const [required, setRequired] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (active) {
      setRequired(false);
      dispatch(setTaskId(uuidv4()));
    }
  }, [active, dispatch]);

  const handleCreateTask = () => {
    if (!task.column_id || !task.M.task_name.S) handleSetRequired();
    else {
      dispatch(addNewTask([task.M, task.column_id]));
      localStorage.put = true;
      onCancel();
    }
  };

  const handleSetRequired = () => {
    if (required) setRequired(false);
    else setRequired(true);
  };

  return (
    <>
      <Backdrop
        active={active}
        onClick={onCancel}
        z="z-20"
        opacity="opacity-50"
      />
      <Container
        className={`h-[675px] w-[480px] 
                    
                    ${active ? "" : "hidden"}`}
        popUp
      >
        <h2 className={`heading-l`}>Add New Task</h2>
        <Container inputNLabel>
          <Label label="Title" htmlFor="title" />
          <Input
            id="title"
            placeholder="e.g. Take coffee break"
            action={setTaskName}
            value={task.M.task_name.S}
            required={required && !task.M.task_name.S}
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
          <Selector
            value={task.column_name}
            active={active}
            required={!task.column_id && required}
          >
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
          value="Create Task"
          onClick={handleCreateTask}
        />
      </Container>
    </>
  );
}
