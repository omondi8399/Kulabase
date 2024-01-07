"use client"

import React, { useState } from 'react'
import EditableImage from './EditableImage'
import Trash from '../icons/Trash';
import Plus from '../icons/Plus';
import MenuItemPriceProps from './MenuItemPriceProps';

const MenuItemForm = ({onSubmit, menuItem}) => {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

return (
    <form onSubmit={ev => onSubmit(ev, {
                image,
                name,
                description,
                basePrice,
                sizes,
                extraIngredientPrices,
                setExtraIngredientPrices
    })} className='mt-8 max-w-md mx-auto'>
        <div className='grid items-start gap-4' 
        style={{gridTemplateColumns: '.3fr .7fr'}}>
            <div className='max-w-[200px]'>
                <EditableImage link={image} setLink={setImage} />
            </div>
            <div className='grow'>
                <label>Item name</label>
                <input type='text' value={name} 
                onChange={ev => setName(ev.target.value)} />
                <label>Description</label>
                <input type='text' value={description}
                onChange={ev => setDescription(ev.target.value)} />
                <label>Base price</label>
                <input type='text' value={basePrice}
                onChange={ev => setBasePrice(ev.target.value)}/>
                <MenuItemPriceProps 
                    name={'Sizes'} 
                    addLabel={'Add item size'}
                    props={sizes} 
                    setProps={setSizes} />
                <MenuItemPriceProps 
                    name={'Extra ingredient'} 
                    addLabel={'Add ingredients prices'}
                    props={extraIngredientPrices} 
                    setProps={setExtraIngredientPrices} />
                <button type='submit'>Save</button>
            </div>
        </div>
    </form>
)
}

export default MenuItemForm
