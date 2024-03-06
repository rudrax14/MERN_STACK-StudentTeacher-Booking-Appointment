import React from 'react';

function NotFound() {
    document.body.style.overflow = 'hidden';
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className='fs-1'>404 Not Found</div>
        </div>
    );
}

export default NotFound;