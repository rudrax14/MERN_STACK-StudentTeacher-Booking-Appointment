import React from 'react'

function Header({ name, style }) {
    return (
        <div className={`header-container shadow p-3 mb-5 bg-${style} text-white`}>
            <div className="container d-flex justify-content-center">
                <p className="fs-1">{name}</p>
            </div>
        </div>
    )
}

export default Header