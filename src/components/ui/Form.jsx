import React, { useState } from 'react'

export const Form = ({className = '', handleSubmit, handleInputChange, setter, name, placeholder, value, type = 'text'}) => {

    const [originalValue] = useState(value);

    return (
        <form
            className={className}
            onSubmit={handleSubmit}
        >
            <input
                autoFocus
                type={type}
                name={name}
                onChange={handleInputChange}
                value={value}
                placeholder={placeholder}
            />
            <div className='form__buttons-container'>
                <button className='form__btn' type='submit'><i className='fas fa-check'></i></button>
                <button
                    className='form__btn'
                    onClick={() => {
                        setter(false);
                        handleInputChange({
                            target: {
                                name,
                                value: originalValue
                            }
                        });
                    }}>
                    <i className='fas fa-times'></i>
                </button>
            </div>
        </form>
    )
}
