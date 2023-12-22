import React from 'react'
import { useState } from 'react';

export const PasswordInput = ({handleInputChange, password, name, hint}) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <label className='auth__input-password-container'>
        <input
            type={showPassword ? 'text' : 'password'}
            className="auth__input"
            name={name}
            placeholder={hint}
            onChange={handleInputChange}
            value={password}
        />
        <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} onClick={handleShowPassword}></i>
        
    </label>
  )
}
