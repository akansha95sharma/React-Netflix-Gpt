import React from 'react'
import Header from './Header';
import GptSearch from './GptSearch';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import { useSelector } from 'react-redux';

const Browse = () => {
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    useNowPlayingMovies();
    usePopularMovies();
    return (
        <div>
            <Header/>
            {
                showGptSearch ? (<GptSearch />) : (
                    <><MainContainer/>
                    <SecondaryContainer/></>
                    
                )
            }
        </div>
    )
}

export default Browse
