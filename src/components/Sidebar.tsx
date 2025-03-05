import { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Theme from "./Theme";
import Container from "./layouts/Container";
import hide from "assets/icon-hide-sidebar.svg";
import showSideBar from "assets/icon-show-sidebar.svg";

export default function Sidebar() {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);

  const handleToggleSidebar = () => {
    setToggleSidebar((prev) => !prev);
  };

  return (
    <div className={"max-[376px]:hidden"}>
      <Container
        className={`h-screen
                   pt-8 pb-10
                  bg-white dark:bg-dark-grey
                  border-r border-[#979797] dark:border-[#3E3F4E]
                  shadow-sm
                  flex flex-col
                  transition-[width]
                  whitespace-nowrap
                  ${toggleSidebar ? `w-[300px] ` : `w-0 overflow-hidden`}`}
      >
        <Container className={`mb-12 px-8`}>
          <Logo />
        </Container>
        <Container
          className={`grow 
                      overflow-y-auto
                      px-8`}
        >
          <Menu />
        </Container>
        <Container className={`px-8`}>
          <Theme />
        </Container>
        <div
          className={`flex items-center gap-3
                      h-[48px]
                      px-8
                      cursor-pointer`}
          onClick={handleToggleSidebar}
        >
          <img src={hide} />
          <div
            className={`heading-m
                      text-medium-grey`}
          >
            Hide Sidebar
          </div>
        </div>
      </Container>
      <div
        className={`flex items-center
        absolute bottom-[5%]
        h-[56px]
        rounded-r-full
        bg-main-purple
        hover:bg-main-purple-hover
        transition-all
        whitespace-nowrap
        cursor-pointer
        ${toggleSidebar ? `w-0 overflow-hidden pl-0` : `w-[48px] pl-3`}`}
        onClick={handleToggleSidebar}
      >
        <img src={showSideBar} />
      </div>
    </div>
  );
}
