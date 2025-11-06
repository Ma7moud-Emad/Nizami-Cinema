import { useRef } from "react";

function Section({
  title,
  sectionWidth,
  items,
  itemRadius,
  itemPadding,
  setSelected,
}) {
  const ref = useRef(null);
  return (
    <div
      className={`text-center border-b border-black dark:border-white pb-4 my-4 ${sectionWidth} mx-auto`}
    >
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <ul
        ref={ref}
        className="flex justify-center flex-wrap gap-3 text-white dark:text-black"
      >
        {items.map((item) => (
          <li
            key={item}
            className={`bg-black/40 dark:bg-white/60 ${itemRadius} cursor-pointer hover:scale-110 transition ${itemPadding} text-sm`}
            onClick={(e) => {
              Array.from(ref.current.children).forEach((item) => {
                if (localStorage.getItem("mode") == "light") {
                  item.classList.remove("bg-black/100");
                } else {
                  item.classList.remove("dark:bg-white/100");
                }
              });

              if (localStorage.getItem("mode") == "light") {
                e.target.classList.add("bg-black/100");
              } else {
                e.target.classList.add("dark:bg-white/100");
              }
              setSelected(e.target.textContent);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Section;
