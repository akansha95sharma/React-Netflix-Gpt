import { useDispatch, useSelector} from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';
import { useEffect } from 'react';

const useMovieTrailer = (movieId) => {
    // fetch trailer video && updating the store with trailer video data
  
    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo);
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);
    //const [trailerId , setTrailerId] = useState(null);
    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos',API_OPTIONS);
        const json = await data.json();
        console.log(json);
        const filterData = json.results.filter(video => video.type == "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        console.log(trailer);
        //setTrailerId(trailer.key);
        dispatch(addTrailerVideo(trailer));
    }
    useEffect(()=>{
        if(!trailerVideo) getMovieVideos();
    },[]);
}

export default useMovieTrailer
