import axios from "axios";
import { NewBoardT } from "../interfaces/types";

export const postNewBoard = async (board: NewBoardT) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE}/board`, board);
    console.log(res)
    return res.status;
  } catch (err) {
    console.log(err);
  }
};
