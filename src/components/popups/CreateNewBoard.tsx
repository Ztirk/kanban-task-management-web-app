import { ChangeEvent, useEffect, useState } from "react";
import { BackDropT, NewBoardT } from "../../interfaces/types";
import Backdrop from "../Backdrop";
import Label from "../Label";
import Input from "../forms/Input";
import Container from "../layouts/Container";
import { v4 as uuidv4 } from "uuid";
import ReuseList from "../forms/ReuseList";
import Button from "../Button";
import { postNewBoard } from "../../apis/post";

const randomShit = ["Todo", "Doing", "Done"];

interface Props extends BackDropT {}

export default function CreateNewBoard({ active, onCancel }: Props) {
  const [newBoard, setNewBoard] = useState<NewBoardT>({
    board_id: "",
    board_name: "",
    column: [],
  });

  useEffect(() => {
    if (active)
      setNewBoard({
        board_id: uuidv4(),
        board_name: "",
        column: [],
      });
  }, [active]);

  const handleSetBoardName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setNewBoard((prev) => ({ ...prev, board_name: value }));
  };

  const handleSetColumn = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const value = e.currentTarget.value;

    const columnIndex = newBoard.column.findIndex((c) => c.column_id == id);

    const alterColumn: NewBoardT["column"][0] = {
      column_id: newBoard.column[columnIndex].column_id,
      column_name: value,
    };

    const reArrageColumn: NewBoardT["column"] = [...newBoard.column];

    reArrageColumn.splice(columnIndex, 1);
    reArrageColumn.splice(columnIndex, 0, alterColumn);

    setNewBoard((prev) => ({
      ...prev,
      column: [...reArrageColumn],
    }));
  };

  const handleDeleteColumn = (id: string) => {
    setNewBoard((prev) => ({
      ...prev,
      column: [...prev.column.filter((obj) => obj.column_id !== id)],
    }));
  };

  const handleAddNewColumn = () => {
    const newColumn: NewBoardT["column"][0] = {
      column_id: uuidv4(),
      column_name: "",
    };

    setNewBoard((prev) => ({ ...prev, column: [...prev.column, newColumn] }));
  };

  const handleCreateNewBoard = async () => {
    onCancel();
    const result = await postNewBoard(newBoard);
    if (result) location.reload();
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
        className={`h-[429px] w-[480px] 
              
              ${active ? "" : "hidden"}`}
        popUp
      >
        <h2 className={`heading-l`}>Add New Board</h2>
        <Container inputNLabel>
          <Label label="Name" htmlFor="name" />
          <Input
            placeholder="e.g. Web Design"
            id="name"
            onChange={handleSetBoardName}
            value={newBoard.board_name}
          />
        </Container>
        <Container inputNLabel>
          <Label label="Columns" />
          <div
            className={`
                      overflow-y-auto
                      max-h-[126px]
                      flex flex-col gap-2
        `}
          >
            
            {newBoard.column.map((c, i) => (
              <ReuseList
                id={c.column_id}
                value={c.column_name}
                onChange={handleSetColumn}
                onDelete={handleDeleteColumn}
                placeholder={
                  randomShit[i >= randomShit.length ? randomShit.length - 1 : i]
                }
              />
            ))}
          </div>
          <Button
            type="add-new-subtask"
            value="+ Add New Column"
            onClick={handleAddNewColumn}
          />
        </Container>
        <Button
          type="create-task"
          value="Create New Board"
          onClick={handleCreateNewBoard}
        />
      </Container>
    </>
  );
}
