
interface Props {
  componentTag?: React.ElementType;
  variant?: 'primary' | 'secundary';
  title: string;
}

export function Heading({componentTag = 'h2', title, variant = "secundary"}: Props) {
  const Heading = componentTag;

  return (
    <Heading className={`${variant === "primary" ? "text-3xl font-bold mb-3" : "text-white/50 text-lg font-bold mb-3"}`}>
      {title}
    </Heading>
  )
}