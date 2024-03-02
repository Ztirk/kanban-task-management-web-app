import { ReactNode } from "react";

interface Props {
  columnName: string;
  noOfTasks: number;
  children: ReactNode;
  index: number;
}

export default function Column({
  columnName,
  noOfTasks,
  children,
  index,
}: Props) {
  const hexArray = [
    "1a2f7b",
    "4c9d0e",
    "8bf63a",
    "e7c52d",
    "f91a8c",
    "03e956",
    "6d7b42",
    "a81fbc",
    "5e96d3",
    "b307f4",
    "7a6c51",
    "2f849d",
    "c0b385",
    "d951e2",
    "48f30c",
    "9e51a8",
    "f7d2e8",
    "385e7a",
    "ba0fc9",
    "85d64f",
    "2bc187",
    "fe8d6a",
    "683514",
    "ad672f",
    "19e63b",
    "976a8d",
    "4b72f9",
    "c15a7e",
    "7d0f32",
    "e8b95c",
    "34d2a6",
    "f91b5c",
    "7a8e1d",
    "4c39e0",
    "e6b59f",
    "925c68",
    "3fae71",
    "b1f46c",
    "d70ae5",
    "8c624f",
    "f283e9",
    "56d079",
    "ae1bc3",
    "69cf40",
    "072f89",
    "d9485b",
    "9a2b7d",
    "f07132",
    "3c986e",
    "e9a4d0",
    "785efa",
    "bc6d90",
    "2d5cf1",
    "f3074c",
    "683b9a",
    "a1e67c",
    "6c89f3",
    "10b48d",
    "e2591a",
    "47f8ce",
    "89d5f2",
    "54b98d",
    "f7d405",
    "2a8ecb",
    "b49e06",
    "78fc4a",
    "3d951e",
    "e7b208",
    "6c39f8",
    "a5107b",
    "f23b9c",
    "49c7ea",
    "9e63fa",
    "e0c38a",
    "76a9fd",
    "d81f9c",
    "a463f5",
    "37c6b8",
    "f49e1a",
    "68d35b",
    "b01f48",
    "7d5c86",
    "e89f3b",
    "2f7d18",
    "9c1a3e",
    "f56a8b",
    "4123dc",
    "ad0b56",
    "605f92",
    "e91b3d",
    "4c8d9a",
    "8f65b2",
    "db6c81",
    "10a93f",
    "f7e9c2",
    "35a8bf",
    "b1e740",
    "7d65fa",
    "2958ec",
    "e0f31a",
  ];

  return (
    <div className={`flex flex-col gap-5 `}>
      <div
        className={`flex items-center gap-2 
                    w-[280px]
        `}
      >
        <div
          className={`
                    h-[15px] aspect-square
                    rounded-full
                    `}
          style={{ backgroundColor: `#${hexArray[index]}` }}
        />
        <span
          className={`heading-s 
                 tracking-[2px]
                text-medium-grey`}
        >
          {columnName.toUpperCase()} ({noOfTasks})
        </span>
      </div>
      <div className={`overflow-y-auto`}>{children}</div>
    </div>
  );
}
