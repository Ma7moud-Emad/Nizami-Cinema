function LetterLabels({ letters, lettersColor }) {
  return (
    <ul
      className={`flex flex-col gap-2 ${
        lettersColor == "left"
          ? "text-black/90 dark:text-white/90"
          : "text-black/10 dark:text-white/10"
      } text-sm font-medium -mt-0.5`}
    >
      {letters.map((row) => (
        <li key={row} className="h-4 flex items-center">
          {row}
        </li>
      ))}
    </ul>
  );
}
export default LetterLabels;
