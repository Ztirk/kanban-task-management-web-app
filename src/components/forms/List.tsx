import { useDispatch, useSelector } from "react-redux";
import { BoardDetails } from "../../interfaces/types";
import Button from "../Button";
import {
  addNewSubTask,
  removeSubTask,
  setSubTask,
} from "../../store/slices/taskSlice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../store/store";
import xMarkIcon from "assets/icon-cross.svg";

interface Props {
  value: BoardDetails["Item"]["column"]["L"][0]["M"]["task"]["L"][0]["M"]["sub_task"]["L"];
}

const randomShit = [
  "e.g. Make coffee",
  "e.g. Drink coffee & smile",
  "e.g. Workout",
];

export default function List({ value }: Props) {
  const task = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch();

  const handleAddList = () => {
    dispatch(
      addNewSubTask({
        M: {
          achieved: {
            BOOL: false,
          },
          sub_task_id: {
            S: uuidv4(),
          },
          sub_task_name: {
            S: "",
          },
        },
      })
    );
  };

  return (
    <>
      <div
        className={`max-h-[126px]
    overflow-y-auto
    flex flex-col gap-2
    `}
      >
        {value ? (
          value.map((v, i) => (
            <div
              className={`flex items-center gap-3
            
                        `}
            >
              <input
                className={`h-[40px] w-full
                        border border-[#828FA3]/25
                        px-3
                        dark:text-white
                      dark:bg-dark-grey
                        `}
                value={
                  task.M.sub_task.L.find(
                    (t) => t.M.sub_task_id.S == v.M.sub_task_id.S
                  )?.M.sub_task_name.S
                }
                id={v.M.sub_task_id.S}
                onChange={(e) =>
                  dispatch(
                    setSubTask({
                      achieved: {
                        BOOL: false,
                      },
                      sub_task_id: { S: e.currentTarget.id },
                      sub_task_name: { S: e.currentTarget.value },
                    })
                  )
                }
                placeholder={
                  randomShit[
                    i > randomShit.length - 1 ? randomShit.length - 1 : i
                  ]
                }
              />
              <img
                className={`cursor-pointer`}
                src={xMarkIcon}
                onClick={() => dispatch(removeSubTask(v.M.sub_task_id.S))}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <Button
        type="add-new-subtask"
        value="+ Add New Subtask"
        onClick={handleAddList}
      />
    </>
  );
}
