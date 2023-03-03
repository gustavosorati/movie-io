import { Star as StarIcon } from "phosphor-react";

interface Props {
  voteAverage: number;
  voteCount: number;
}

export function Star({voteAverage, voteCount}: Props) {
  return (
    <div className="flex items-center gap-1">
      <StarIcon size={16} weight="fill" className="fill-yellow-200 drop-shadow" />
            
      <span className="text-[10px] text-yellow-200 font-medium">{voteAverage}</span>
      <span className="text-[10px] text-white/30">de</span>
      
      <span className="text-[10px] text-yellow-200 font-bold">{voteCount}</span>
      <span className="text-[10px] text-white/30">votos</span>
    </div>
  )
}