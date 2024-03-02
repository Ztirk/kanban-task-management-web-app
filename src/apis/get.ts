import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { BoardDetails, BoardNames } from "../interfaces/types";
import { store } from "../store/store";
import { fetchBoard } from "../store/slices/boardSlice";

export const getBoardNames = async (
  setBoards: Dispatch<SetStateAction<BoardNames | undefined>>
) => {
  try {
    const res: AxiosResponse<BoardNames> = await axios.get(
      `${import.meta.env.VITE_BASE}/all-board`
    );
    setBoards(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const getBoardDetails = async (id: string) => {
  try {
    const res: AxiosResponse<BoardDetails> = await axios.get(
      `${import.meta.env.VITE_BASE}/board/${id}`
    );
    store.dispatch(fetchBoard(res.data.Item));
  } catch (err) {
    console.log(err);
  }
};
