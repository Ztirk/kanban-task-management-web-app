import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BoardDetails } from "../../interfaces/types";

const initialState: BoardDetails["Item"]["column"]["L"][0]["M"]["task"]["L"][0] & {
  column_id: string;
  column_name: string;
} = {
  M: {
    task_id: {
      S: "",
    },
    task_name: {
      S: "",
    },
    description: {
      S: "",
    },
    sub_task: {
      L: [],
    },
  },
  column_id: "",
  column_name: "",
};
export const addNewBoardSlice = createSlice({
  name: "addNewBoard",
  initialState,
  reducers: {
    setTask(
      state,
      action: PayloadAction<
        BoardDetails["Item"]["column"]["L"][0]["M"]["task"]["L"][0]["M"]
      >
    ) {
      state.M = action.payload;
    },
    setTaskId(state, action: PayloadAction<string>) {
      state.M.task_id.S = action.payload;
    },
    setTaskName(state, action: PayloadAction<string>) {
      state.M.task_name.S = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.M.description.S = action.payload;
    },
    setSubTask(
      state,
      action: PayloadAction<
        BoardDetails["Item"]["column"]["L"][0]["M"]["task"]["L"][0]["M"]["sub_task"]["L"][0]["M"]
      >
    ) {
      const editingSubTask = state.M.sub_task.L.find(
        (st) => st.M.sub_task_id.S == action.payload.sub_task_id.S
      );
      if (editingSubTask) {
        editingSubTask.M = { ...action.payload };
      }
    },
    setColumn(state, action: PayloadAction<[string, string]>) {
      state.column_id = action.payload[0];
      state.column_name = action.payload[1];
    },
    setDefaultTask() {
      return initialState;
    },
    removeSubTask(state, action: PayloadAction<string>) {
      const index = state.M.sub_task.L.findIndex(
        (st) => st.M.sub_task_id.S == action.payload
      );
      state.M.sub_task.L.splice(index, 1);
    },
    addNewSubTask(
      state,
      action: PayloadAction<
        BoardDetails["Item"]["column"]["L"][0]["M"]["task"]["L"][0]["M"]["sub_task"]["L"][0]
      >
    ) {
      state.M.sub_task.L.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewSubTask,
  setDescription,
  setSubTask,
  setTaskId,
  setTaskName,
  removeSubTask,
  setColumn,
  setDefaultTask,
  setTask,
} = addNewBoardSlice.actions;

export default addNewBoardSlice.reducer;
