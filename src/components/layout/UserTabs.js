import Link from 'next/link'
import React from 'react'

const UserTabs = ({isAdmin}) => {
return (
    <div className='flex gap-2 tabs mx-auto justify-center'>
            <Link className={'active'} href={'/profile'}>Profile</Link>
            {isAdmin && (
                <>
                    <Link href={'/categories'}>Categories</Link>
                    <Link href={'/menu-items'}>Menu Items</Link>
                    <Link href={'/users'}>Users</Link>
                </>
            )}
        </div>
)
}

export default UserTabs
