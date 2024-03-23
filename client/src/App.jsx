import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import MovieResults from './components/MovieResults'
import Searchbar from './components/Searchbar'

function App() {
  const [titles , setTitles] = useState([]);
  const location = "127.0.0.1:5000";
  const [movies, setMovies] = useState([{ name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  { name: "movie", link: "link", img: "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg" },
  ])

  useEffect(() => {
    async function fetch_movies() {
      try {
        const response = await fetch(`http://${location}/api/fetch`, { method: 'GET' });
        const data = await response.json();
        setTitles(Object.values(JSON.parse(data["titles"])));
        console.log(titles);
      } catch (e) {
        console.log(e);
        return e;
      }
    }
    fetch_movies();
  } , [])

  return (
    <>
      <Navbar></Navbar>
      <Searchbar titles = {titles} setmovies={setMovies}></Searchbar>
      <div className='flex flex-col justify-center'>
        <MovieResults movies={movies}></MovieResults>
      </div>
    </>
  )
}

export default App
