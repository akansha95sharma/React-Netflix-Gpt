import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
//import {json} from "body-parser";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);
    const handleGPTSearchClick = async () => {
        console.log(searchText.current.value);
        // make an api call to gpt api and get movie results
        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " + searchText.current.value + ". only give me names of 5 movies , comma seperated like the example result given ahead. Example Result : Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
          });
          if(!gptResults.choices){//TODO: write error handling
        }
          console.log(gptResults.choices?.[0]?.message?.content);
          const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");
          //["Andaz Apna Apna","Hera Pheri","Chupke Chupke","Jaane Bhi Do Yaaro","Padosan"];
          const data = gptMovies.map((movie) => searchMovieTMDB(movie));
          const tmdbResults = await Promise.all(data);
          console.log(tmdbResults);
          dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
        }

        //  Search movie in TMDB
        const searchMovieTMDB = async (movie) => {
            const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS);
            const json = await data.json();
            return json.results;
        }
     
    return (
        <div className='pt-[35%] md:pt-[10%] flex justify-center'>
            <form className='bg-black w-full md:w-1/2 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3' onClick={handleGPTSearchClick}>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar
