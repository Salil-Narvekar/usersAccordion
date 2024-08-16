import React from 'react'
import Select from "react-dropdown-select";

const InputFields = ({ name, id, type, onChange, onInput, placeholder, value, selectFieldOptions, labelField, valueField }) => {
    return (
        <div>

            {
                type === 'text' ?

                    <input
                        className='text-xs md:text-sm lg:text-sm text-slate-700 font-medium text-left border border-slate-300 outline-slate-300 rounded-md w-full h-7 pl-1 pr-1 mt-1'
                        name={name}
                        id={id}
                        type={type}
                        onChange={onChange}
                        placeholder={placeholder}
                        value={value}
                        onInput={onInput}
                    />

                    : type === 'number' ?

                        <input
                            className='text-xs md:text-sm lg:text-sm text-slate-700 font-medium text-left border border-slate-300 outline-slate-300 rounded-md w-full h-7 pl-1 pr-1 mt-1'
                            name={name}
                            id={id}
                            type={type}
                            onChange={onChange}
                            placeholder={placeholder}
                            value={value}
                        />

                        : type === 'textarea' ?

                            <textarea
                                className='text-xs md:text-sm lg:text-sm text-slate-700 font-medium text-left border border-slate-300 outline-slate-300 rounded-md w-full max-h-24 min-h-24 pl-1 pr-1 py-1 mt-1'
                                name={name}
                                id={id}
                                type={type}
                                onChange={onChange}
                                placeholder={placeholder}
                                value={value}
                            />

                            : type === 'selectBox' &&

                            <Select
                                className='text-xs md:text-sm lg:text-sm font-medium text-left outline-slate-300 mt-1 text-slate-700'
                                style={{ borderRadius: '6px', minHeight: '28px', width: '100%'}}
                                name={name}
                                id={id}
                                options={selectFieldOptions}
                                labelField={labelField}
                                valueField={valueField}
                                values={value}
                                onChange={onChange}
                            />
            }
        </div>
    )
}

export default InputFields