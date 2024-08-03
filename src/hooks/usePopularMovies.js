import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";


const usePopularMovies = () => {
    // Fetch Data from TMDB API and update store
    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular',API_OPTIONS);
        const json = await data.json();
        console.log(json.results);
        dispatch(addPopularMovies(json.results));
    };
    useEffect(()=>{
        !popularMovies && getPopularMovies();
    },[]);
}

export default usePopularMovies;