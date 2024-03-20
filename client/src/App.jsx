import { useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className = "container my-12 mx-auto grid grid-cols-8 gap-3 px-4 md:px-12 md:text-sm">
    <MovieCard movie = {"shreeram"} movie_img = "https://www.themoviedb.org/t/p/w342/pljRizZMI0RZ9dJEdSwqCRfYtr.jpg"></MovieCard>
    </div>
  )
}

export default App
