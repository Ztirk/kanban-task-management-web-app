import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { DragEvent, useEffect, useState } from "react";
import { getBoardDetails } from "../apis/get";
import Column from "../components/Column";
import Task from "../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addNewColumnList, dragNDropTask } from "../store/slices/boardSlice";
import { putBoard } from "../apis/put";
import Button from "../components/Button";
import { v4 as uuidv4 } from "uuid";

export default function Board() {
  const { board_id } = useParams();
  const [fetching, setFetching] = useState<boolean>(false);

  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    if (board_id) getBoardDetails(board_id, setFetching);
  }, [board_id]);

  useEffect(() => {
    if (board) {
      if (localStorage.post == "true") {
        console.log("hello");
        localStorage.post = false;
      }
      if (localStorage.put == "true") {
        putBoard(board);
        localStorage.put = false;
      }
      if (localStorage.delete == "true") {
        console.log("hello");
        localStorage.delete = false;
      }
    }
  }, [board]);

  const handleAddNewColumn = () => {
    localStorage.put = true;
    dispatch(addNewColumnList(uuidv4()));
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    task_id: string,
    start_column_id: string
  ): void => {
    e.dataTransfer.setData("taskId", task_id);
    e.dataTransfer.setData("startColumnId", start_column_id);
  };

  const handleOnDrop = (
    e: DragEvent<HTMLDivElement>,
    endColumnId: string
  ): void => {
    const taskId = e.dataTransfer.getData("taskId");
    const startColumnId = e.dataTransfer.getData("startColumnId");

    localStorage.put = true;
    dispatch(dragNDropTask([startColumnId, endColumnId, taskId]));
  };

  const onDragOver = (e: DragEvent): void => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className={`h-screen 
                 overflow-x-auto
               bg-light-grey-light-bg
               dark:bg-very-dark-grey-dark-bg`}
      >
        <Header />
        <div
          className={`flex gap-5 
                       px-8 py-7
                       h-[calc(100%-96px)]
                       `}
        >
          {board && !fetching ? (
            <>
              {board.column.L.map((column, i) => (
                <>
                  <Column
                    columnId={column.M.column_id.S}
                    columnName={column.M.column_name.S}
                    noOfTasks={column.M.task.L.length}
                    index={i}
                    onDrop={handleOnDrop}
                    onDragOver={onDragOver}
                  >
                    {column.M.task.L.map((task) => (
                      <Task
                        task={task.M}
                        column={column.M}
                        onDragStart={handleDragStart}
                      />
                    ))}
                  </Column>
                </>
              ))}
              {board.column.L.length ? (
                <div
                  className={`bg-[#E9EFFA] dark:bg-dark-grey
                         text-medium-grey
                         heading-xl
                         flex justify-center items-center
                         rounded-md
                         shadow-sm
                           w-[280px] 
                           mt-[35px]
                           px-[140px]
                           cursor-pointer
                      `}
                  onClick={handleAddNewColumn}
                >
                  + New Column
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center flex-col gap-9
                            w-full
              `}
                >
                  <h2 className={`heading-l text-medium-grey`}>
                    This board is empty. Create a new column to get started.
                  </h2>
                  <Button
                    type="add-new-column"
                    value="+ Add New Column"
                    onClick={handleAddNewColumn}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {Array.from({ length: 4 }, (_d, i) => (
                <div
                  className={`bg-black/10 animate-pulse
                     rounded-md
                     shadow-sm
                       w-[280px]
                       px-[140px]
                       
                  `}
                  onClick={handleAddNewColumn}
                  key={i}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
