function Status({ seatStatus, lightColor, darkColor }) {
  return (
    <ul className="flex justify-center gap-6 flex-wrap">
      {seatStatus.map((status, index) => (
        <li
          key={status.label}
          className="flex items-center gap-1 capitalize text-sm"
        >
          <span
            className={`w-3 h-3 rounded-full bg${lightColor[index]} dark:bg${darkColor[index]}`}
          />
          {status.label}
        </li>
      ))}
    </ul>
  );
}
export default Status;
