import React from 'react'

function MovieCard(props) {
  return (
    <div className="my-1 border rounded-lg bg-primary border-content w-max">
    <img className="rounded-t-lg max-h-64" src={props.movie_img} alt={props.movie_name} />
    <div className="p-2 flex flex-grow w-[169px] capitalize">
        <a href= {props.movie_link}>
            <p className="mb-2 text-xl text-content font-bold">{props.movie_name}</p>
        </a>
    </div>
</div>
  )
}

export default MovieCard