import React from 'react'

const ProfilePhoto = ({ image }) => {
    return (
        <img src={image} className='rounded-full border border-slate-200 h-full' />
    )
}

export default ProfilePhoto