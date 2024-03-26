import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BoardDetails } from "../../interfaces/types";

const initialState: BoardDetails["Item"] = {
  board_id: {
    S: "",
  },
  board_name: {
    S: "",
  },
  created_date: {
    S: "",
  },
  column: {
    L: [],
  },
};
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addNewColumn(
      state,
      action: PayloadAction<BoardDetails["Item"]["column"]["L"][0]["M"]>
    ) {
      state.column.L.push({ M: action.payload });
    },
    removeColumn(state, action: PayloadAction<string>) {
      const columnIndex = state.column.L.findIndex(
        (c) => c.M.column_id.S == action.payload
      );
      if (columnIndex) state.column.L.splice(columnIndex, 1);
    },
    setBoardName(state, action: PayloadAction<string>) {
      state.board_name.S = action.payload;
    },
    setColumnName(state, action: PayloadAction<[string, string]>) {
      const columnId = action.payload[0];
      const columnName = action.payload[1];

      const columnIndex = state.column.L.findIndex(
        (c) => c.M.column_id.S == columnId
      );

      state.column.L[columnIndex].M.column_name.S = columnName;
    },
    addNewColumnList(state, action: PayloadAction<string>) {
      state.column.L.push({
        M: {
          column_id: { S: action.payload },
          column_name: { S: "" },
          task: { L: [] },
        },
      });
    },
    deleteColumn(state, action: PayloadAction<string>) {
      const columnIdex = state.column.L.findIndex(
        (c) => c.M.column_id.S == action.payload
      );

      state.column.L.splice(columnIdex, 1);
    },
    deleteTask(state, action: PayloadAction<[string, string]>) {
      const columnId = action.payload[0];
      const taskId = action.payload[1];

      const taskIndex = state.column.L.find(
        (c) => c.M.column_id.S == columnId
      )?.M.task.L.findIndex((t) => t.M.task_id.S == taskId);

      if (typeof taskIndex == "number")
        state.column.L.find(
          (c) => c.M.column_id.S == columnId
        )?.M.task.L.splice(taskIndex, 1);
    },
    changeTaskColumn(state, action: PayloadAction<[string, string]>) {
      const newColumnId = action.payload[0];
      const taskId = action.payload[1];
      const newColumn = state.column.L.find(
        (c) => c.M.column_id.S == newColumnId
      );

      if (newColumn) {
        let found = false;

        for (const column of state.column.L) {
          if (found) break;
          for (const taskIndex in column.M.task.L) {
            if (column.M.task.L[taskIndex].M.task_id.S == taskId) {
              found = true;
              newColumn.M.task.L.push(column.M.task.L[taskIndex]);
              column.M.task.L.splice(Number(taskIndex), 1);
              break;
            }
          }
        }
      }
    },
    setCheckedSubTask(
      state,
      action: PayloadAction<[boolean, string, string, string]>
    ) {
      const checked = action.payload[0];
      const columnId = action.payload[1];
      const taskId = action.payload[2];
      const subTaskId = action.payload[3];

      const subTask = state.column.L.find((c) => c.M.column_id.S == columnId)
        ?.M.task.L.find((t) => t.M.task_id.S == taskId)
        ?.M.sub_task.L.find((st) => st.M.sub_task_id.S == subTaskId)?.M;

      if (subTask) {
        subTask.achieved.BOOL = checked;
      }
    },
    fetchBoard(_state, action: PayloadAction<BoardDetails["Item"]>) {
      return action.payload;
    },
    addNewTask(
      state,
      action: PayloadAction<
        [
          BoardDetails["Item"]["column"]["L"][0]["M"]["task"]["L"][0]["M"],
          string
        ]
      >
    ) {
      const newTask = action.payload[0];
      const columnId = action.payload[1];
      state.column.L.find((c) => c.M.column_id.S == columnId)?.M.task.L.push({
        M: newTask,
      });
    },
    dragNDropTask(state, action: PayloadAction<[string, string, string]>) {
      const startColumnId = action.payload[0];
      const endColumnId = action.payload[1];
      const taskId = action.payload[2];

      const startColumnIndex = state.column.L.findIndex(
        (c) => c.M.column_id.S == startColumnId
      );
      const taskIndex = state.column.L[startColumnIndex].M.task.L.findIndex(
        (t) => t.M.task_id.S == taskId
      );
      const dragingTask = state.column.L[startColumnIndex].M.task.L[taskIndex];

      const endColumnIndex = state.column.L.findIndex(
        (c) => c.M.column_id.S == endColumnId
      );
      state.column.L[endColumnIndex].M.task.L.push(dragingTask);

      state.column.L[startColumnIndex].M.task.L.splice(taskIndex, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewColumnList,
  addNewTask,
  fetchBoard,
  setCheckedSubTask,
  changeTaskColumn,
  deleteTask,
  addNewColumn,
  removeColumn,
  setBoardName,
  deleteColumn,
  setColumnName,
  dragNDropTask,
} = boardSlice.actions;

export default boardSlice.reducer;
