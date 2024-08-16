import React, { useContext } from 'react'
import { BsSearch } from "react-icons/bs";
import { OppenedAccordian } from '../App';

const SearchBar = ({ onChange }) => {

    const oppenedAccordian = useContext(OppenedAccordian);

    return (
        <div
            className='grid grid-cols-9 justify-items-start items-center 
            border rounded-lg border-slate-400 hover:border-slate-600 duration-500
            h-10'
        >
            <div className='col-span-1 text-md grid items-center justify-items-center text-slate-500 h-full w-full'>
                <BsSearch />
            </div>

            <input
                className={
                    oppenedAccordian.oppenedAccordianId.editState ?
                    'col-span-8 text-md text-slate-700 text-left cursor-not-allowed outline-none rounded-lg h-full w-full pr-2'
                    :
                    'col-span-8 text-md text-slate-700 text-left outline-none rounded-lg h-full w-full pr-2'

                }
                name='searchField'
                id='searchField'
                type='text'
                onChange={onChange}
                placeholder='Search user'
                disabled={oppenedAccordian.oppenedAccordianId.editState}
            />
        </div>
    )
}

export default SearchBar