import React from 'react'

const MovieCard = ({ movie: {title, poster_path, release_date, vote_average, original_language} }) => {
  return (
    <div className = "bg-gray-920 p-5 rounded-2xl shadow-inner shadow-gray-200/10 hover:bg-gray-900 backdrop-blur-sm hover:backdrop-blur-lg hover:border hover:border-blue-180">
      <img src = {poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'public/no-movie.jpg'} alt = {title} className = "hover:grayscale-65"/>

      <div className = "mt-4">
        <h3>{title}</h3>
      </div>

      <div className = "rating flex gap-2 mt-2">
        <img src = "/star.svg" alt = "star" className = "w-7 h-7"/>
        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        <span>•</span>
        <p>{original_language}</p>
        <span>•</span>
        <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
      </div>
    </div>
  )
}

export default MovieCard