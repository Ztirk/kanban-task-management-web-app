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
    const milSec = (date: string) => new Date(date).getTime();

    setBoards({
      ...res.data,
      Items: res.data.Items.sort(
        (a, b) => milSec(a.created_date.S) - milSec(b.created_date.S)
      ),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getBoardDetails = async (
  id: string,
  setFetching?: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (setFetching) setFetching(true);
    const res: AxiosResponse<BoardDetails> = await axios.get(
      `${import.meta.env.VITE_BASE}/board/${id}`
    );
    store.dispatch(fetchBoard(res.data.Item));
  } catch (err) {
    console.log(err);
  } finally {
    if (setFetching) setFetching(false);
  }
};
