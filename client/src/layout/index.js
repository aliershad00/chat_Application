import React from 'react'
import logoNav from "../assets/LogoNav.png"

const AuthLayouts = ({ children }) => {
    return (
        <>
            <header className='flex justify-center items-center  py-1 h-22 shadow-md bg-white'>
                <img
                    src={logoNav}
                    alt='logoNav'
                    width={100}
                    height={70}

                />
            </header>

            {children}
        </>
    )
}
export default AuthLayouts