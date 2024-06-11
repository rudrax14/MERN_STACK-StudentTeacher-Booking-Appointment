import React from 'react'

function Spinner() {
    return (
        <div className="position-absolute top-50 start-50 translate-middle ">
            <div className="spinner-border text-primary fs-4" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner