import {useEffect, useState} from 'react';
import Search from './components/search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET' ,
  headers: {
    accept: 'application/json' ,
    Authorization: `bearer ${API_KEY}`
  }
}
var x = 0;

const handleReload = () => {
  window.location.reload();
};

const scrollDown = () => {
  window.addEventListener('scroll', function () {
    let h = this.document.documentElement;
    let st = h.scrollTop || this.document.body.scrollTop;
    let sh = h.scrollHeight || this.document.body.scrollHeight;

    let percent = st / (sh - h.clientHeight) * 100;
    x = Math.round(percent);
  })
  if (x < 10) {
    window.scrollBy({
      top: 425, // scroll down by 100px
      behavior: "smooth", // smooth animation
      })
    x = x + 1;
  };  
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  useDebounce( () => setDebounceSearchTerm(searchTerm), 800, [searchTerm]);

  const fetchMovies = async ( query = '' ) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query 
      ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('failed to fetch movies');
      }
      const data = await response.json();
      
      if(data.Response === false) {
        setErrorMessage(data.Error || 'failed to fetch movies.');
        setMovieList([]);
        return;
      }
      console.log("data", data);
      setMovieList(data.results || []);
    } catch(error) {
      console.error(`error fetching movies: ${error}`);
      setErrorMessage('error fetching movies, please try again later......');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

let scroller;

const hoverScroll = (() => { 
  if (scroller) return;
  scroller = setInterval(() => {
    window.scrollBy({
      top: 400, // scroll down by 100px
      behavior: "smooth", // smooth animation
  })}, 1600);
});

  const stopScroll = () => {
    clearInterval(scroller);
    scroller = null;
  };

  return (
    <main>
      <div className= "wrapper bg-cover bg-center h-screen relative">
        <img src = "dream.svg" alt = "title-image" className = "absolute inset-0 mx-auto z-10 brightness-120 p-4 hover:filter hover:hue-rotate-215 hover:saturate-90 hover:brightness-75 hover:contrast-110 peer"/>
        <img src = "reload.svg" alt = "reload_now" className = "absolute flex justify-end right-0 p-4 w-20 h-20 z-10 hover:filter hover:hue-rotate-215 hover:saturate-90 hover:brightness-75 hover:contrast-110" title = "click me to reload page" onClick = {handleReload}/>
        <div className = "absolute text-white text-xl backdrop-blur-sm z-30 h-850 mt-10 ml-2 animate-pulse rounded-lg hover:bg-white/12" onMouseEnter = {hoverScroll} onMouseLeave = {stopScroll}>
        <img src = "upp.svg" alt = "up-up" className = "flex justify-end p-4 w-20 h-20 mt-10 rotate-180"/>
        <p className = "ml-7.5 font-bold">H</p>
        <p className = "ml-7.5 font-bold">O</p>
        <p className = "ml-7.5 font-bold">V</p>
        <p className = "ml-7.5 font-bold">E</p>
        <p className = "ml-7.5 font-bold">R</p>
        <p className = "ml-7.5">ㅤ</p>
        <p className = "ml-7.5">ㅤ</p>
        <p className = "ml-7.5 font-bold">T</p>
        <p className = "ml-7.5 font-bold">O</p>
        <p className = "ml-7.5">ㅤ</p>
        <p className = "ml-7.5">ㅤ</p>
        <p className = "ml-7.5 font-bold">S</p>
        <p className = "ml-7.5 font-bold">C</p>
        <p className = "ml-7.5 font-bold">R</p>
        <p className = "ml-7.5 font-bold">O</p>
        <p className = "ml-7.5 font-bold">L</p>
        <p className = "ml-7.5 font-bold">L</p>
      </div>
        <div className = "absolute inset-0 bg-cover bg-center transition-all duration-300 peer-hover:grayscale" style={{ backgroundImage: "url('/movie-bg.jpg')"}}/>
        <header className="absolute inset-0 flex items-center justify-center text-center p-4">
          <h1 className="text-3xl font-bold text-white -translate-y-10 mb-6 -translate-x-1 animate-bounce" style = {{animationIterationCount: 3.5}}>
            Find <span className="text-gradient">Movies</span> That You'll Like With Over a Million To Choose From.
          </h1>
        </header>
      
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <section className = "all-movies relative justify-center top-100 flex text-white text-2xl">
          <div>
          { isLoading ? <h2 className = "opacity-0">MOVIES</h2> : <h2 className = "text-red-800 hover:text-3xl brightness-120 hover:filter hover:hue-rotate-215 hover:saturate-140 hover:scroll-down hover:brightness-85 hover:contrast-110 translate-x-159 translate-y-25" onMouseEnter={scrollDown}>MOVIES.</h2>}
          </div>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className = "text-red text-lg">{errorMessage}</p>
        ) : (
          <ul className = "grid grid-cols-4 gap-6 justify-items-start mt-45 w-300 h-350 mr-18">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}

        </section>
      </div>
    </main>
  );
};

export default App;