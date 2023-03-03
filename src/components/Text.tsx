
interface Props {
  componentTag?: React.ElementType;
  variant?: 'primary' | 'secundary';
  text: string;
}

export function Text({componentTag = 'p', text, variant = "secundary"}: Props) {
  const TextComponent = componentTag;

  return (
    <TextComponent className={`$text-md text-white/40 text-justify`}>
      {text}
    </TextComponent>
  )
}