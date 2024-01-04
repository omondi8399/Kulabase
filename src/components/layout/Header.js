    import {signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
    import React from 'react'

    const Header = () => {
        const session = useSession()
        const status = session?.status;
        const userData = session.data?.user;
        let userName = userData?.name || userData?.email;
        if (userName && userName.includes(' ')) {
            userName = userName.split('')[0];
        }
    return (
        <>
            <header className='flex items-center justify-between'>
        
            <nav className='flex gap-8 items-center text-gray-500 font-semibold'>
                <Link className='text-primary font-semibold text-2xl' href='/'>Kulabase</Link>
                <Link href={'/'}>Home</Link>
                <Link href={''}>Menu</Link>
                <Link href={''}>About</Link>
                <Link href={''}>Contact</Link>
                <Link href={''} className='bg-primary rounded-full text-white px-8 py-2'>Login</Link>
            </nav>
            <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
                {status === 'authenticated' && (
                    <>  
                        <Link href={'/profile'} className='whitespace-nowrap'>
                            Hello, {userName}</Link>
                        <button onClick={() => signOut()} className='bg-primary rounded-full text-white px-8 py-2'>
                            Logout
                        </button>
                    </>
                )}
                {status !== 'unauthenticated' && (
                    <>
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'} className='bg-primary rounded-full text-white px-8 py-2'>Register</Link>
                    </>
                )}
            </nav>
            </header>
        </>
    )
    }

    export default Header