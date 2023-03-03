import Link from "next/link";

interface Props {
  text?: string;
  url: string;
}

export function GenericLink({text = "ver mais", url}: Props) {

  return (
    <Link className="text-sm text-blue-500 underline cursor-pointer w-fit" href={url}>
      {text}
    </Link>
  )
}