interface Props {
  label: string;
  htmlFor?: string;
}

export default function Label({ label, htmlFor }: Props) {
  return (
    <label className={`body-m text-medium-grey `} htmlFor={htmlFor}>
      {label}
    </label>
  );
}
