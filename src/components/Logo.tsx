import logo from "assets/logo-dark.svg";
import lightLogo from "assets/logo-light.svg";

export default function Logo() {
  return (
    <>
      <img src={logo} className="dark:hidden block" />
      <img src={lightLogo} className="hidden dark:block" />
    </>
  );
}
