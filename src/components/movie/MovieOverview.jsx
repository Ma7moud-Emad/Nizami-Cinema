import { Link, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import getMovieDetails from "../../Serveries/movieDetails";
import LoadingThreeDotsPulse from "../ui/LoadingThreeDotsPulse";

export default function MovieOverview() {
  const { movieId } = useParams();
  const isNowPlaying = location.pathname.includes("nowplaying");

  const { data, isPending, error } = useFetch(["movie#", movieId], () =>
    getMovieDetails(movieId)
  );

  if (isPending) {
    return <LoadingThreeDotsPulse />;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <section className="relative text-white bg-black">
      {/* Background */}
      <div className="absolute right-0 hidden md:block min-h-screen">
        <img
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt={data.title}
          className="object-cover w-screen h-screen opacity-50 "
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 ">
        {/* Poster */}
        <div className="max-h-screen overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
            alt={data.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info */}
        <div className="p-4 space-y-4">
          <h1 className="text-5xl font-bold">{data.title}</h1>
          <p className="text-gray-300 italic">{data.original_title}</p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
            <span>• {data.release_date}</span>
            <span>• {data.runtime} min</span>
            <span>
              • {data.genres.reduce((acc, cur) => `${acc.name} - ${cur.name}`)}
            </span>
          </div>

          <p className="text-lg text-gray-200 leading-relaxed">
            {data.overview}
          </p>

          <div className="flex gap-4 pt-4">
            <Link
              to={data.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Watch Now
            </Link>
            {isNowPlaying && (
              <Link
                to={`/nowplaying/bookticket/${data.id}`}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold"
              >
                Book now
              </Link>
            )}
          </div>

          <div className="text-sm text-gray-400 pt-6 border-t border-gray-700">
            <p>
              <span className="font-semibold">Languages:</span>
              {data.spoken_languages.reduce((acc, cur, index) => {
                if (index === 0) return ` ${cur.english_name}`;
                return ` ${acc} & ${cur.english_name}`;
              }, "")}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {data.vote_average}{" "}
              / 10
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
