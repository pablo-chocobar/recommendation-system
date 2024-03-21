import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import MovieResults from './components/MovieResults'

function App() {
  const [count, setCount] = useState(0)
  const movies = [{name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
  {name : "movie" , link : "link" , img : "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"},
]

  return (
    <>
    <Navbar></Navbar>
    <div className='flex flex-col justify-center'>
      <MovieResults movies = {movies}></MovieResults>
    </div>
    </>
  )
}

export default App
