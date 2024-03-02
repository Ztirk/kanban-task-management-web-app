import { Outlet } from "react-router-dom";
import Frame from "../components/layouts/Frame";

export default function Main() {
  return (
    <>
      <Frame>
        <Outlet />
      </Frame>
    </>
  );
}
