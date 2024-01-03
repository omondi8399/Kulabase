import Image from 'next/image'
import React from 'react'
import MenuItem from '../menu/MenuItem'
import SectionHeaders from './SectionHeaders'

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
            <SectionHeaders 
                subHeader={'check out'}
                mainHeader={'Menu'}
            />
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
