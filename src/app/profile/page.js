"use client"

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import Link from 'next/link'
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'
import MenuItemForm from '@/components/layout/MenuItemForm'


const ProfilePage = () => {
    const session = useSession()
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

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
                    setProfileFetched(true);
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

    

    if (status === 'loading' || !profileFetched) {
        return "loading..."
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

return (
    <section className='mt-8'>
        
        <UserTabs isAdmin={isAdmin} />
        <div className='max-w-2xl mx-auto mt-8'>
            <div className='flex gap-4'>
                <div>
                    <div className=' p-2 rounded-lg relative max-x-[120px]'>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                </div>
                <MenuItemForm />
            </div>
        </div>
    </section>
)
}

export default ProfilePage
