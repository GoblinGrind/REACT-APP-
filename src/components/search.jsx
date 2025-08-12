import React from 'react'

const search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className = "top-10 group relative left-160 w-130 h-19 bg-white/12 backdrop-blur-sm p-3 rounded-lg items-center justify-center text-center -translate-x-35 translate-y-98 hover:bg-black/50 hover:w-150 hover:left-150 active:bg-white/80 active:w-150 active:left-150">
      <img src = "search.svg" alt = "search" className = "w-1/2 h-15 flex overflow-hidden -translate-x-24 -translate-y-1 group-active:opacity-0"/>

      <input 
        className = "absolute text-white -translate-x-43 -translate-y-18 w-108 z-10 bg-transparent hover:w-117 hover:h-19 hover:w-80 h-19 rounded-lg hover:rounded-lg"
        type = "text"
        placeholder = "search through thousands of movies right now."
        value = {searchTerm}
        onChange = {(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default search
