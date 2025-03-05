import Button from "./Button";
import OptionIcon from "assets/icon-vertical-ellipsis.svg";
import AddNewTask from "./popups/AddNewTask";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setDefaultTask } from "../store/slices/taskSlice";
import Backdrop from "./Backdrop";
import EditBoard from "./popups/EditBoard";
import DeleteBoard from "./popups/DeleteBoard";
import { useParams } from "react-router-dom";
import logo from "assets/logo-mobile.svg";
import chevronDown from "assets/icon-chevron-down.svg";
import chevronUp from "assets/icon-chevron-up.svg";

import { getBoardDetails } from "../apis/get";
import MiniSidebar from "./MiniSidebar";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default function Header() {
  const [addNewTask, setAddNewTask] = useState<boolean>(false);
  const [boardOption, setBoardOption] = useState<boolean>(false);
  const [editBoard, setEditBoard] = useState<boolean>(false);
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false);
  const [toggleMiniSidebar, setToggleMiniSidebar] = useState<boolean>(false);
  const { width } = useWindowSize();

  const { board_id } = useParams();

  const board = useSelector((state: RootState) => state.board);

  const dispatch = useDispatch();

  const handleToggleAddNewTask = () => {
    dispatch(setDefaultTask());
    setAddNewTask((prev) => !prev);
  };

  const handleOpenBoardOption = () => {
    setBoardOption(true);
  };

  const handleCloseBoardOption = () => {
    setBoardOption(false);
  };

  const handleOpenEditBoard = () => {
    setEditBoard(true);
  };

  const handleCloseEditBoard = () => {
    setEditBoard(false);
  };

  const handleOpenDeleteBoard = () => {
    setDeleteBoard(true);
  };

  const handleCloseDeleteBoard = () => {
    setDeleteBoard(false);
  };

  const handleToggleSidebarOpen = () => {
    setToggleMiniSidebar(true);
  };

  const handleToggleSidebarClose = () => {
    console.log("hey");
    setToggleMiniSidebar(false);
  };

  const handleCloseAll = () => {
    handleCloseBoardOption();
    handleCloseDeleteBoard();
    handleCloseEditBoard();
  };

  const handleFetchInitial = async () => {
    handleCloseAll();
    if (board_id) await getBoardDetails(board_id);
  };

  return (
    <>
      <Backdrop
        active={toggleMiniSidebar}
        onClick={handleToggleSidebarClose}
        opacity="opacity-50"
        z="z-20"
      />
      <MiniSidebar open={toggleMiniSidebar} />
      <AddNewTask active={addNewTask} onCancel={handleToggleAddNewTask} />
      <Backdrop
        active={boardOption}
        onClick={handleFetchInitial}
        opacity={editBoard || deleteBoard ? "opacity-50" : "opacity-0"}
        z={editBoard || deleteBoard ? "z-20" : "z-0"}
      />
      {editBoard ? <EditBoard closeAll={handleCloseAll} /> : <></>}
      {deleteBoard ? <DeleteBoard onCloseAll={handleCloseAll} /> : <></>}

      <div
        className={`min-[376px]:h-[96px] max-[376px]:h-[64px] px-6 
                  z-10
                  sticky left-0
                bg-white dark:bg-dark-grey
                shadow-sm
                flex items-center justify-between`}
        onClick={handleCloseBoardOption}
      >
        <h1
          className={`heading-xl 
                      max-mobile:flex max-mobile:gap-[16px]
                      items-center
                      `}
        >
          <img src={logo} className="min-[376px]:hidden" />
          <div
            className="flex gap-[8px] items-center"
            onClick={handleToggleSidebarOpen}
          >
            <div
              className={`max-mobile:flex max-mobile:items-center gap-[8px] dark:text-white
                            max-[376px]:whitespace-nowrap max-[376px]:max-w-[143px] max-[376px]:font-[18px] max-[376px]:overflow-hidden`}
            >
              {board ? board.board_name.S : ""}
            </div>
            <img
              src={toggleMiniSidebar ? chevronUp : chevronDown}
              className="min-[376px]:hidden"
            />
          </div>
        </h1>
        <div
          className={`flex gap-5 items-center
                      relative
                      
        `}
        >
          <Button
            type="add-new-task"
            value={width > 375 ? "+ Add New Task" : "+"}
            onClick={handleToggleAddNewTask}
            disable={!board.column.L.length}
          />
          <img
            className="cursor-pointer"
            src={OptionIcon}
            onClick={(e) => {
              handleOpenBoardOption();
              e.stopPropagation();
            }}
          />
          {editBoard || deleteBoard ? (
            <></>
          ) : (
            <ul
              className={`
                        bg-white 
                        h-[94px] w-[192px]
                        flex justify-center flex-col gap-3
                        pl-5
                        absolute top-16 max-[376px]:right-1
                        rounded-md
                        shadow
                        body-l
                        dark:bg-dark-grey
                        ${boardOption ? "" : "hidden"}
          
          `}
              onClick={(e) => e.stopPropagation()}
            >
              <li
                className={`text-medium-grey
                            cursor-pointer
            `}
                onClick={handleOpenEditBoard}
              >
                Edit Board
              </li>
              <li
                className={`text-red
                            cursor-pointer`}
                onClick={handleOpenDeleteBoard}
              >
                Delete Board
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
