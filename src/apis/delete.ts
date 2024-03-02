import axios from "axios";

export const deleteBoard = async (id: string) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_BASE}/board/${id}`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
