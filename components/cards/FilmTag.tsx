interface TagProps {
  text: string;
}

const FilmTag: React.FC<TagProps> = ({ text }) => {
  const tagColors: Record<string, string> = {
    year: 'bg-indigo-500',
    drama: 'bg-red-500',
    crime: 'bg-purple-500',
    documentary: 'bg-yellow-500',
    adventure: 'bg-blue-500',
    comedy: 'bg-green-500',
    action: 'bg-gray-700',
    romance: 'bg-teal-500',
    war: 'bg-orange-500',
    music: 'bg-pink-600',
    thriller: 'bg-yellow-600',
    fantasy: 'bg-blue-600',
    default: 'bg-pink-500',
  };

  const color = tagColors[text.toLowerCase()] || tagColors.default;

  return (
    <span
      className={`mt-2 self-start ${color} text-white text-xs font-bold px-1 rounded-full`}
    >
      {text}
    </span>
  );
};

export default FilmTag;
