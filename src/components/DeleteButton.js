import React, { useState } from 'react'

const DeleteButton = ({label, onDelete}) => {
    const [showConfirm, setShowComfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className='fixed bg-black/80 inset-0 flex items-center justify-center h-full'>
                <div className='bg-white p-4 rounded-lg'>
                <div>Are you sure you want to delete?</div>
                <div className='flex gap-2 mt-1'>
                <button type='button'onClick={() => setShowComfirm(false)}>
                    Cancel
                </button>
                <button onClick={() => {
                    onDelete() 
                    setShowComfirm(false) 
                }} 
                    type='button' className='primary'>Yes, delete!</button>
            </div>
            </div>
            </div>
        )
    }
  return (
    
    <button type='button' onClick={() => setShowComfirm(true)}>{label}</button>
  )
}

export default DeleteButton