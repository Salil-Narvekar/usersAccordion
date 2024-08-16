import React from 'react'

const ValidationText = ({message}) => {
  return (
    <div className='grid items-end text-xs md:text-sm lg:text-sm text-orange-800 font-medium'>
        {message}
    </div>
  )
}

export default ValidationText