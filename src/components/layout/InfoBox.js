import React from 'react'

const InfoBox = ({children}) => {
return (
    <div className='text-center bg-blue-100 p-4 rounded-lg border border-blue-300'>
        {children}
    </div>
)
}

export default InfoBox
