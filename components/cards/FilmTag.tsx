import { TAG_COLORS } from '../../utils/constants';

const FilmTag: React.FC<{ text: string }> = ({ text }) => {
  const color = TAG_COLORS[text?.toLowerCase()] || TAG_COLORS.default;

  return (
    <span
      className={`mt-2 self-start ${color} text-white text-xs font-bold px-1 rounded-full`}
    >
      {text}
    </span>
  );
};

export default FilmTag;
