import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import getMovieDetails from "./../../Serveries/movieDetails";
import LoadingThreeDotsPulse from "../ui/LoadingThreeDotsPulse";
import { useState } from "react";
import Section from "./Section";
import LetterLabels from "./LetterLabels";
import Seats from "./Seats";
import Status from "./Status";
import light from "../../assests/light.svg";

export default function BookTicket() {
  const { movieId } = useParams();

  const [chosenDate, setChosenDate] = useState(null);
  const [chosenTime, setChosenTime] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);

  // get moive details
  const { data, isPending, error } = useFetch(["now_playing", movieId], () =>
    getMovieDetails(movieId)
  );

  // available dates, times, letters and seats
  const dates = [21, 22, 23, 24, 25, 26];
  const times = ["13:10", "15:06", "18:25", "20:00", "22:09", "23:59"];
  const letters = ["A", "B", "C", "D", "E", "F", "G"].reverse();
  const seatStatus = [
    { label: "available", color: "bg-black/20" },
    { label: "booked", color: "bg-black/80" },
    { label: "selected", color: "bg-[#8d090d]" },
  ];

  function mapToGrades(scores) {
    // Define the grade ranges
    const gradeRanges = [
      { letter: "G", range: [1, 6], price: 25 },
      { letter: "F", range: [7, 14], price: 30 },
      { letter: "E", range: [15, 24], price: 35 },
      { letter: "D", range: [25, 36], price: 40 },
      { letter: "C", range: [37, 48], price: 45 },
      { letter: "B", range: [49, 60], price: 50 },
      { letter: "A", range: [61, 72], price: 55 },
    ];

    let totalPrice = 0;
    const gradedScores = scores.map((score) => {
      // Find the grade for this score
      const grade = gradeRanges.find(
        (range) => score >= range.range[0] && score <= range.range[1]
      );

      if (grade) {
        // Calculate position within the range
        const position = score - grade.range[0] + 1;
        totalPrice += grade.price;
        return [grade.letter, position, grade.price];
      }

      return ["Unknown", score, 0];
    });

    return {
      items: gradedScores,
      totalPrice: totalPrice,
    };
  }

  const { items, totalPrice } = mapToGrades(reservedSeats);
  if (isPending) {
    return <LoadingThreeDotsPulse />;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <section className="flex flex-col-reverse md:flex-row md:max-h-screen md:min-h-screen md:overflow-y-hidden dark:bg-black">
      <div className="relative md:w-1/2">
        {chosenDate && chosenTime && reservedSeats.length != 0 ? (
          <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-black text-white min-w-1/2 rounded-xl min-h-1/3 pt-5 ">
            <h2 className="uppercase text-center mb-2">Selected seats</h2>
            <ul className="text-sm">
              {items.map((item) => {
                return (
                  <li key={item} className="flex items-center gap-2 p-2">
                    <span className="w-4 h-4 bg-gray-500 rounded-full block"></span>
                    {item[0]} Row / {item[1]} Seat
                    <span className="ml-auto">${item[2]}</span>
                  </li>
                );
              })}
            </ul>
            <button className="bg-[#8d090d] my-5 mx-auto px-4 py-2 rounded-md block cursor-pointer">
              Purchase (${totalPrice})
            </button>
          </div>
        ) : (
          ""
        )}
        <img
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          alt="cover"
          className="object-cover h-full w-full"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`;
          }}
        />
      </div>
      <div className="md:w-1/2 md:my-auto">
        {/* Date Selection */}
        <Section
          title="Date"
          sectionWidth="w-3/5"
          items={dates}
          itemRadius="rounded-full"
          itemPadding="px-1 py-3"
          setSelected={setChosenDate}
        />
        {/* Time Selection */}
        <Section
          title="Time"
          sectionWidth="w-4/5"
          items={times}
          itemRadius="rounded-3xl"
          itemPadding="px-2.5 py-1"
          setSelected={setChosenTime}
        />
        <img src={light} alt="light" className="mx-auto" />
        {/* Cinema Hall */}
        <div className="mb-8 -mt-12">
          <div className="flex justify-center items-start gap-4 mb-8">
            <LetterLabels letters={letters} lettersColor="left" />
            <Seats seatsNum={72} setReserved={setReservedSeats} />
            <LetterLabels letters={letters} lettersColor="right" />
          </div>
          <Status
            seatStatus={seatStatus}
            lightColor={["-black/20", "-black/80", "-[#8d090d]"]}
            darkColor={["-white/20", "-white/80", "-[#8d090d]"]}
          />
        </div>
      </div>
    </section>
  );
}
