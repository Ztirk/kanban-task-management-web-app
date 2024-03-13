import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import Label from "../Label";
import Input from "../forms/Input";
import ReuseList from "../forms/ReuseList";
import Container from "../layouts/Container";
import { RootState } from "../../store/store";
import {
  addNewColumnList,
  deleteColumn,
  setBoardName,
  setColumnName,
} from "../../store/slices/boardSlice";
import { putBoard } from "../../apis/put";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Spinning from "../loading/Spinning";

interface Props {
  closeAll: () => void;
}

const randomShit = ["Todo", "Doing", "Done"];

export default function EditBoard({ closeAll }: Props) {
  const [requesting, setRequesting] = useState<boolean>(false);
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  const handleAddNewColumn = () => {
    dispatch(addNewColumnList(uuidv4()));
  };

  const handleSaveChanges = async () => {
    setRequesting(true);
    await putBoard(board);
    setRequesting(false);
    closeAll();
    location.reload();
  };

  return (
    <Container
      className={`
                  h-[481px] w-[480px]

  `}
      popUp
    >
      <h2 className={`heading-l`}>Edit Board</h2>
      <Container inputNLabel>
        <Label label="Name" htmlFor="name" />
        <Input
          placeholder="e.g. Web Design"
          id="name"
          action={setBoardName}
          value={board.board_name.S}
        />
      </Container>
      <Container inputNLabel>
        <Label label="Columns" />
        <div
          className={`
                      overflow-y-auto
                      max-h-[160px]
                      flex flex-col gap-2
        `}
        >
          {board.column.L.map((c, i) => (
            <ReuseList
              id={c.M.column_id.S}
              value={c.M.column_name.S}
              inputAction={setColumnName}
              deleteAction={deleteColumn}
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
        value={<>{requesting ? <Spinning /> : <></>} &nbsp;Save Changes</>}
        onClick={handleSaveChanges}
      />
    </Container>
  );
}
