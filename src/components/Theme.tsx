import sun from "assets/icon-light-theme.svg";
import moon from "assets/icon-dark-theme.svg";
import { useState } from "react";

export default function Theme() {
  const [theme, setTheme] = useState<boolean>(false);

  const handleChangeTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <div
      className={`h-[48px] 
                    flex justify-center items-center gap-4
                    bg-light-grey-light-bg 
                    rounded-md`}
    >
      <img src={sun} />
      <label
        htmlFor="theme-toggle"
        className={`h-[20px] w-[40px]
                    rounded-full
                    bg-main-purple
                    relative
                      `}
      >
        <input
          id="theme-toggle"
          type="checkbox"
          className="sr-only"
          onChange={handleChangeTheme}
        />
        <div
          className={`w-[14px] aspect-square
                        rounded-full
                        bg-white
                        transition-all
                        absolute top-1/2 -translate-y-1/2
                         ${!theme ? "left-[2px]" : "left-[23px]"} 
                        `}
        />
      </label>
      <img src={moon} />
    </div>
  );
}
