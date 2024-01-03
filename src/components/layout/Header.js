    import Link from 'next/link'
    import React from 'react'

    const Header = () => {
    return (
        <>
            <header className='flex items-center justify-between'>
            <Link className='text-primary font-semibold text-2xl' href=''>Kulabase</Link>
            <nav className='flex gap-8 items-center text-gray-500 font-semibold'>
                <Link href={''}>Home</Link>
                <Link href={''}>Menu</Link>
                <Link href={''}>About</Link>
                <Link href={''}>Contact</Link>
                <Link href={''} className='bg-primary rounded-full text-white px-8 py-2'>Login</Link>
            </nav>
            </header>
        </>
    )
    }

    export default Header