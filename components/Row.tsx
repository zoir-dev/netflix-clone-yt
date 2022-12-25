import React, { useRef, useState } from 'react'
import { Movie } from '../pages/typing'
import { ArrowForwardIos } from '@mui/icons-material'
import Thumbnail from './Thumbnail'
interface Props {
    title: string | null,
    movies: Movie[]
}
function Row({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [moved, setMoved] = useState(false)
    const handleClick = (direction: string) => {
        setMoved(true)
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }
    return (
        <div className='h-40 spac-y-0.5 md:space-y-2 '>
            <h2 className='w-56 cursor-pointer  font-semibold text-[#e5e5e5] transition duration-200 hover:text-white'>
                {title}
            </h2>
            <div className='group relative md:-ml-2'>
                <ArrowForwardIos className={`absolute top-0 bottom-0 left-2 z-40  m-auto h-9 
                cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 rotate-180 ${!moved && `hidden`}`}
                    onClick={() => handleClick('left')} />
                <div ref={rowRef} className='flex items-center space-x-0.5  overflow-x-scroll md:space-x-2.5  md:p-2 '>
                    {movies.map((m) => (
                        <Thumbnail key={m.id} m={m} />
                    ))}
                </div>
                <ArrowForwardIos className={`absolute top-0 bottom-0 right-2  z-40  m-auto h-9
                 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
                    onClick={() => handleClick('right')} />
            </div>
        </div>
    )
}

export default Row