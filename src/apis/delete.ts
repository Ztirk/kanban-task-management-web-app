import axios from "axios";

export const deleteBoard = async (id: string) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_BASE}/board/${id}`);

    if (res.status == 200) return true;
  } catch (err) {
    console.log(err);
  }
};
