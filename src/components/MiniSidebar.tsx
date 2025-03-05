import Container from "./layouts/Container";
import Menu from "./Menu";
import Theme from "./Theme";

interface Props {
  open: boolean;
}

function MiniSidebar({ open }: Props) {
  return (
    <div
      className={
        open
          ? "fixed bg-white z-30 inset-0 m-auto w-[264px] h-[322px] pt-[17px] rounded-[8px]"
          : "hidden"
      }
    >
      <Container
        className={`grow
                                overflow-y-auto
                                h-[240px]
                                px-8`}
      >
        <Menu />
      </Container>

      <Container className={`px-8`}>
        <Theme />
      </Container>
    </div>
  );
}

export default MiniSidebar;
