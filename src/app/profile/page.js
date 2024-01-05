"use client"

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const session = useSession()
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [session, status])

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault()
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name:userName, image}),
        })
            setIsSaving(false);
        if (response.ok) {
            setSaved(true)
        }
    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('files', files[0]);
            setIsUploading(false);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
            const link = await response.json();
            setImage(link);
            setIsUploading(false);
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
        <h1 className='text-center text-primary text-4xl mb-4'>
            Profile
        </h1>
        <div className='max-w-md mx-auto'>
            {saved && (
                <div className='text-center bg-green-100 p-4 rounded-lg border border-green-300'>
                Profile saved!
                </div>
            )}
            {isSaving && (
                <div className='text-center bg-blue-100 p-4 rounded-lg border border-blue-300'>
                Saving...
                </div>
            )}
            {isUploading && (
                <div className='text-center bg-blue-100 p-4 rounded-lg border border-blue-300'>
                Uploading...
                </div>
            )}
            <div className='flex gap-4 items-center'>
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
                    <input type="text" placeholder='First and last name'
                    value={userName} onChange={ev.target.value} />
                    <input type="email" disabled={true} value={session.data.user.email} />
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    </section>
)
}

export default ProfilePage
