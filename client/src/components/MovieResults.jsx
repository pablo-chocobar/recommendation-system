import MovieCard from "./MovieCard";

function MovieResults(props) {
  return (
    <div className = " my-4 container grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] px-8 md:text-sm">
    {/* // <div className = "my-4 container flex flex-row space-x-4 overflow-x-scroll md:text-sm"> */}
    {/* // <div className = "my-4 w-full flex flex-wrap justify-evenly md:text-sm"> */}
    {
            props.movies.map((movie) => {
                return (
                <MovieCard movie_name = {movie.name} movie_img = {movie.img} movie_link = {movie.link} />
                )
            })
        }
    </div>
  )
}

export default MovieResults