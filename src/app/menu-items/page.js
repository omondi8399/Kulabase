"use client"
import { useProfile } from '@/components/UseProfile'
import Right from '@/components/icons/Right';
import MenuItemForm from '@/components/layout/MenuItemForm';
import UserTabs from '@/components/layout/UserTabs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


const MenuItemPage = () => {
    
    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })
    }, []);

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.isAdmin) {
        return 'Not an admin'
    }
return (
    <section className='mt-8 max-w-md mx-auto'>
        <UserTabs isAdmin={true} />
            <div className='mt-8'>
                <Link className='button'
                href={'/menu-items/new'}> 
                Create new menu item
                <Right />
                </Link>
            </div>
            <div>
                <h2 className='text-sm text-gray-500 mt-4'>Edit menu item:</h2>
                <div className='grid grid-cols-3 gap-2'>
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/'+item._id}  
                            className='bg-gray-200 rounded-lg p-4' key={item}>
                            <div className='relative'>
                                <Image className='rounded-md' src={item.image} alt={''} width={100} height={100}  />
                            </div>
                            <div className='text-center'>
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
    </section>
)
}

export default MenuItemPage
