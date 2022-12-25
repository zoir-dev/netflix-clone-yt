import React from 'react'
import { Movie } from '../pages/typing'
import Image from 'next/image'

interface Props {
    m: Movie
}
function Thumbnail({ m }: Props) {
    return (
        <div className='relative scrollbar-hide h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out  md:h-36 md:min-w-[260px] md:hover:scale-105'>
            <Image src={`https://image.tmdb.org/t/p/w500${m.backdrop_path || m.poster_path}`} alt='' className='object-cover rounded-sm md:rounded' layout='fill' />
        </div>
    )
}

export default Thumbnail