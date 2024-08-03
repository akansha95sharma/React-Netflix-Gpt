import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({posterPath}) => {
    if(!posterPath) return null;
    return (
        <div className='pr-4'>
           <img className='w-36 md:w-48' alt='Movie Card' src={IMG_CDN + posterPath}/>
        </div>
    )
}

export default MovieCard
