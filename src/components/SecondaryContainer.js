import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies);
    return (
        <div className='bg-black'>
        <div className='mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20'>{movies && 
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        }
        </div>
        <div className='-mt-0 pl-12 relative z-20'>
        {movies && 
            <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        }
        {movies && 
            <MovieList title={"Popular"} movies={movies.popularMovies} />
        }
        {movies && 
            <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies} />
        }
        {movies && 
            <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
        }
        </div>
        </div>
    )
}

export default SecondaryContainer
