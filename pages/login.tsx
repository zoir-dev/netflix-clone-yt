import { Button, TextField } from '@mui/material';
import { auth } from './firebase';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth';


interface Inputs {
    email: string,
    password: string
}
function Login() {
    const [login, setLogin] = useState(false)
    const { SignIn, SignUp } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if (login) {
            await SignIn(email, password)
        } else {
            await SignUp(email, password)
        }
    };


    return (
        <div className='relative flex h-screen w-screen
         flex-col md:items-center md:justify-center
         md:bg:transparent'>
            <Head>
                <title>Netflix</title>
            </Head>
            <Image src='https://rb.gy/p2hphi' alt=''
                layout="fill"
                objectFit='cover'
                className="-z-10 !hidden opacity-60 sm:!inline" />

            <img src="https://rb.gy/ulxxee" width={150} height={150}
                className='absolute cursor-pointer left-4 top-4 object-contain  md:left-10 md:top-6' alt="" />
            <form onSubmit={handleSubmit(onSubmit)}
                className='relative mt-24 space-y-8  rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 '>
                <h1 className='text-4xl font-semibold'>Sign In</h1>
                <div className='space-y-4'>
                    <input className='input' type='email'
                        placeholder='Email'{...register('email', { required: true })} />
                    {errors.email && <span className='p-1 text-[13px] font-light text-orange-500'>
                        This field is required
                    </span>}
                    <input className='input' type='password'
                        placeholder='Password' {...register('password', { required: true })} />
                    {errors.password && <span className='p-1 text-[13px] font-light text-orange-500'>
                        Your password must cantain 4-60 characters
                    </span>}
                    <Button className='bg-[#e50914]' type='submit' onClick={() => setLogin(true)} color='error'
                        fullWidth variant='contained'>
                        Sign In
                    </Button>
                    <div className='text-[gray]'>
                        New to Netflix? <button type='submit' className='cursor-pointer text-white hover:underline'
                            onClick={() => setLogin(false)}>Sign up now
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default Login