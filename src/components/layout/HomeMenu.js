import Image from 'next/image'
import React from 'react'
import MenuItem from '../menu/MenuItem'

const HomeMenu = () => {
return (
    <section className=''>
        <div className='absolute left-0 right-0 w-full justify-start overflow-hidden'>
            <div className=' absolute left-0 -top-[70px] -z-10 text-left'>
                <Image src={'/sallad1.png'} width={109} height={189} alt={'sallad'} />
            </div>
            <div className=' absolute -top-[100px] -right-0 -z-10'>
                <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
            </div>
        </div>
        <div className='text-center mb-4'>
            <h3 className='uppercase text-gray-500 font-semibold leading-4'>
                Check out
            </h3>
            <h2 className='text-primary font-bold text-4xl italic'>Menu</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
        </div>
    </section>
)
}

export default HomeMenu
