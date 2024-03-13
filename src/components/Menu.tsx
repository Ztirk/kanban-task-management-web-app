import boardImg from "assets/icon-board.svg";
import { useEffect, useState, MouseEvent } from "react";
import { getBoardNames } from "../apis/get";
import { BoardNames } from "../interfaces/types";
import { useNavigate, useParams } from "react-router-dom";
import CreateNewBoard from "./popups/CreateNewBoard";

export default function Menu() {
  const [boards, setBoards] = useState<BoardNames>();
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { board_id } = useParams();

  useEffect(() => {
    getBoardNames(setBoards);
  }, []);

  useEffect(() => {
    if (boards) {
      if (board_id) {
        setSelectedBoard(board_id);
        navigate(`/board/${board_id}`);
      } else {
        setSelectedBoard(boards.Items[0].board_id.S);
        navigate(`/board/${boards.Items[0].board_id.S}`);
      }
    }
  }, [boards, board_id, navigate]);

  const handleClickBoard = (e: MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;
    setSelectedBoard(id);
    navigate(`/board/${id}`);
  };

  const handleOpenPopUp = () => {
    setOpen(true);
  };

  const handleClosePopUp = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateNewBoard active={open} onCancel={handleClosePopUp} />
      <div
        className={`heading-m 
                    text-medium-grey
                    mb-7
                    tracking-[2.5px]`}
      >
        ALL BOARDS ({boards ? boards.Count : 0})
      </div>
      <ul className={`flex flex-col`}>
        {boards ? (
          boards.Items.map((board) => (
            <li
              onClick={handleClickBoard}
              key={board.board_id.S}
              id={board.board_id.S}
              className={`flex items-center gap-3 
                          heading-m
                        text-medium-grey
                          h-[48px]
                          px-8
                          rounded-r-full
                          -left-8 relative
                          cursor-pointer
                          ${
                            selectedBoard == board.board_id.S
                              ? `bg-main-purple
                               text-white`
                              : `hover:bg-main-purple/10
                              hover:text-main-purple`
                          }`}
            >
              <img
                src={boardImg}
                className={`${
                  selectedBoard == board.board_id.S
                    ? `brightness-0 
                      invert`
                    : `hover:brightness-100 
                      hover:invert-0`
                }`}
              />
              {board.board_name.S}
            </li>
          ))
        ) : (
          <></>
        )}
        <li
          className={`heading-m
                      flex items-center gap-3  
                      h-[48px]  
                    text-main-purple
                    hover:bg-main-purple/10
                    relative -left-8
                    px-8
                    rounded-r-full
                     cursor-pointer`}
          onClick={handleOpenPopUp}
        >
          <img src={boardImg} />+ Create New Board
        </li>
      </ul>
    </>
  );
}
