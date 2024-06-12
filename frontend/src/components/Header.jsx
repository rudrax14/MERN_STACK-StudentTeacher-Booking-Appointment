import React from 'react'

function Header({ name, style }) {
    return (
        <div className={`h-24 w-full ${style} flex justify-center items-center`}>
            
            <p className="text-white text-4xl">{name}</p>
          </div>
    )
}

export default Header