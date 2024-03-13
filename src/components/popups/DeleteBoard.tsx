import { useSelector } from "react-redux";
import Button from "../Button";
import Container from "../layouts/Container";
import { RootState } from "../../store/store";
import { deleteBoard } from "../../apis/delete";
import { useState } from "react";
import Spinning from "../loading/Spinning";

interface Props {
  onCloseAll: () => void;
}

export default function DeleteBoard({ onCloseAll }: Props) {
  const board = useSelector((state: RootState) => state.board);
  const [requesting, setRequesting] = useState<boolean>(false);

  const handleDeleteBoard = async () => {
    setRequesting(true);
    await deleteBoard(board.board_id.S);
    onCloseAll();
    setRequesting(false);
    location.reload();
  };

  return (
    <Container className={`w-[480px] h-[229px]`} popUp>
      <h2
        className={`heading-l
                text-red
  `}
      >
        Delete this board?
      </h2>
      <p
        className={`body-l
                text-medium-grey
    `}
      >
        Are you sure you want to delete the ‘{board.board_name.S}’ board? This
        action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className={`flex justify-center gap-5`}>
        <Button
          value={<>{requesting ? <Spinning /> : <></>} &nbsp;Delete</>}
          type="delete"
          onClick={handleDeleteBoard}
        />
        <Button value="Cancel" type="cancel" onClick={onCloseAll} />
      </div>
    </Container>
  );
}
