import axios from "axios";
import { BoardDetails } from "../interfaces/types";

export const putBoard = async (body: BoardDetails["Item"]) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BASE}/board`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
