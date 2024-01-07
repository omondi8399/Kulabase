import React, { useState } from 'react'
import Plus from '../icons/Plus';
import Trash from '../icons/Trash';
import ChevronDown from '../icons/ChevronDown';
import ChevronUp from '../icons/ChevronUp';

const MenuItemPriceProps = ({addLabel,name,props, setProps}) => {
    
    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, {name:'', price:0}];
        })
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v,index) => index !== indexToRemove));
    }
  return (
    <div className='bg-gray-200 p-2 rounded-md mb-2'>
            <button 
            onClick={() => setIsOpen(prev => !prev)}
            type='button' className='inline-flex p-1 border-0 justify-start'>
                {isOpen && (
                    <ChevronUp />
                )}
                {!isOpen && (
                    <ChevronDown />
                )}
                
                <span>{name}</span>
                <span>{props?.length}</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
            {props?.length > 0 && props.map((size, index) => (
        <div key={size} className='flex items-end gap-2'>
            <div>
                <label>Name</label>
                <input type='text' placeholder='Size name' value={size.name}
                onChange={ev => editProp(ev, index, 'name')} />
            </div>
            <div>
                <label>Extra price</label>
                <input type='number' placeholder='Extra price' value={size.price}
                onChange={ev => editProp(ev, index, 'price')} />
            </div>
            <div>
                <button type="button" 
                onClick={() => removeProp(index)} 
                className='bg-white mb-2 px-2'>
                    <Trash />
                </button>
            </div>
        </div>
    ))}
    <button type='button' onClick={addProp} 
    className='bg-white items-center'>
        <Plus className='w-4 h-4' />
        <span>{addLabel}</span>
    </button>
            </div>
</div>
  )
}

export default MenuItemPriceProps