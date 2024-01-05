"use client"

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import Link from 'next/link'
import UserTabs from '@/components/layout/UserTabs'


const ProfilePage = () => {
    const session = useSession()
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    consr [isAdmin, setIsAdmin] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                })
            })
        }
    }, [session, status])

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault()

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name:userName, 
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country,
                }),
            })
            if (response.ok) 
                resolve()
            else
                reject()
        })
        
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        })
    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('files', files[0]);

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setImage(link);
                    }) 
                }
                throw new Error('Something went wrong');
            })
            

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete',
                error: 'Uploading error',
            })
            
        } 
    }

    if (status === 'loading') {
        return "loading..."
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

return (
    <section className='mt-8'>
        
        <UserTabs isAdmin={isAdmin} />
        <div className='max-w-md mx-auto mt-8'>
            <div className='flex gap-4'>
                <div>
                    <div className=' p-2 rounded-lg relative max-x-[120px]'>
                        {image && (
                            <Image className='rounded-lg w-full h-full mb-1' 
                            src={image} width={250} height={250} alt={'avatar'} />
                        )}
                        <label>
                            <input type='file' className='hidden' onChange={handleFileChange} />
                            <span className='block border border-gray-300 rounded-lg p-2 text-center
                            cursor-pointer'>Edit</span>
                        </label>
                    </div>
                </div>
                <form className='grow' onSubmit={handleProfileInfoUpdate}>
                    <label>First and last name</label>
                    <input type="text" placeholder='First and last name'
                    value={userName} onChange={ev.target.value} />
                    <label>Email</label>
                    <input type="email" disabled={true} value={session.data.user.email} />
                    <label>Phone</label>
                    <input type='tel' placeholder='Phone number'
                        value={phone} onChange={ev => setPhone(ev.target.value)} />
                    <label>StreetAddress</label>
                    <input type='text' placeholder='Street address'
                        value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                    <div className='flex gap-2'>
                        <div>
                            <label>PostalCode</label>
                            <input 
                                type='text' placeholder='Postal code'
                            value={postalCode} onChange={ev => setPostalCode(ev.target.value)} />
                        </div>
                        <div>
                            <label>City</label>
                            <input 
                            type='text' placeholder='City'
                            value={city} onChange={ev => setCity(ev.target.value)} />
                        </div>
                    </div>
                    <label>Country</label>
                    <input type='text' placeholder='country' 
                    value={country} onChange={ev => setCountry(ev.target.value)} />
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    </section>
)
}

export default ProfilePage
