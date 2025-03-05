interface Props {
  active: boolean;
  onClick: () => void;
  z: string;
  opacity: string;
}

export default function Backdrop({ active, onClick, z, opacity }: Props) {
  return (
    <div
      className={`fixed top-0 left-0
                bg-black
                    h-full w-full z-10
                ${active ? "" : "hidden"}
                ${z}
                ${opacity}`}
      onClick={onClick}
    ></div>
  );
}
