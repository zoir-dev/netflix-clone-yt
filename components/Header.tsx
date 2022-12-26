import React, { useEffect, useState } from 'react';
import { Notifications, Search } from '@mui/icons-material';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

function Header() {
    const [scroll, setScroll] = useState(false);

    const { LogOut } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true)
            } else { setScroll(false) }
        }
        window.addEventListener('scroll', handleScroll)
        return () => { removeEventListener('scroll', handleScroll) }
    }, [])
    return (
        <header className={`${scroll && 'bg-[#141414]'}`}>
            <div className='flex items-center space-x-2 md:space-x-10'>
                <img src="https://rb.gy/ulxxee" alt="" width={100} height={100} className='cursor-pointer  object-fit-contain' />
                <ul className='hidden space-x-4 md:flex'>
                    <li className='headerLink'>Home</li>
                    <li className='headerLink'>Tv Shows</li>
                    <li className='headerLink'>Movies</li>
                    <li className='headerLink'>New & Popular</li>
                    <li className='headerLink'>My List</li>
                </ul>
            </div>
            <div className='flex items-center space-x-4 text-sm font-light'>
                <Search className='hidden h6 w-6 sm:inline' />
                <p className="hidden lg:inline">Kids</p>
                <Notifications className='h-6 w-6' />
                {/* <Link href='/account' > */}
                <img src="https://rb.gy/g1pwyx" alt="" onClick={LogOut} className='cursor-pointer rounded' />
                {/* </Link> */}
            </div>
        </header>
    )
}

export default Header;