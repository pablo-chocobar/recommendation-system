import React from 'react'

function MovieCard(props) {
  return (
    <div className="my-1 border rounded-lg bg-primary border-content w-max">
    <img className="rounded-t-lg max-h-64" src={props.movie_img} alt={props.movie_name} />
    <div className="p-5">
        <a href= {props.movie_link}>
            <h5 className="mb-2 text-xl text-content font-semibold tracking-tight content">{props.movie_name}</h5>
        </a>
    </div>
</div>
  )
}

export default MovieCard