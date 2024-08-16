import React from 'react'

const UserFullName = ({name}) => {
  return (
    <div className='text-md md:text-lg lg:text-xl xl:text-xlfont-semibold pl-4 md:pl-0 lg:pl-0'>{name}</div>
  )
}

export default UserFullName