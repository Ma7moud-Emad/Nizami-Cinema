import { useRef } from "react";

function Seats({ seatsNum, setReserved }) {
  const ref = useRef(null);
  return (
    <ul ref={ref} className="grid grid-cols-12 gap-2">
      {Array.from({ length: seatsNum }).map((_, index) => {
        return (
          <li
            key={index}
            className={`${
              index == 0
                ? "col-span-4 justify-self-end"
                : index == 5
                ? "col-span-4"
                : index == 6
                ? "col-span-3 justify-self-end"
                : index == 13
                ? "col-span-3"
                : index == 14
                ? "col-span-2 justify-self-end"
                : index == 23 && "col-span-2"
            } w-4 h-4 rounded-full cursor-pointer transition-all hover:scale-110 ${
              index == 2 ||
              index == 8 ||
              index == 13 ||
              index == 25 ||
              index == 36 ||
              index == 39 ||
              index == 41 ||
              index == 59 ||
              index == 63 ||
              index == 68 ||
              index == 72
                ? "bg-black/80 dark:bg-white/80"
                : "bg-black/20 dark:bg-white/20"
            }`}
            onClick={(e) => {
              const target = e.currentTarget; // Use currentTarget instead of target
              const isSelectable =
                target.classList.contains("bg-black/20") ||
                target.classList.contains("dark:bg-white/20") ||
                target.classList.contains("bg-[#8d090d]");

              if (!isSelectable) return;

              // Toggle classes
              target.classList.toggle("bg-black/20");
              target.classList.toggle("dark:bg-white/20");
              target.classList.toggle("bg-[#8d090d]");

              // Update state
              setReserved((prevState) =>
                prevState.includes(index + 1)
                  ? prevState.filter((item) => item !== index + 1)
                  : [...prevState, index + 1]
              );
            }}
          ></li>
        );
      })}
    </ul>
  );
}
export default Seats;
