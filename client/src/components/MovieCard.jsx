import React from 'react'

function MovieCard(props) {
  return (
    <div className="my-1 border rounded-lg shadow bg-gray-800 border-gray-700">
    <img className="rounded-t-lg" src={props.movie_img} alt={props.movie} />
    <div className="p-5">
        <a href= {props.movie_link}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-100">{props.movie}</h5>
        </a>
    </div>
</div>
  )
}

export default MovieCard