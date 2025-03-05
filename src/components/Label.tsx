interface Props {
  label: string;
  htmlFor?: string;
}

export default function Label({ label, htmlFor }: Props) {
  return (
    <label
      className={`body-m text-medium-grey dark:text-white`}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}
