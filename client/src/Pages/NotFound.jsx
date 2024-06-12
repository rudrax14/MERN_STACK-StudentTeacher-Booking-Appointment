import React from 'react';

function NotFound() {
    document.body.style.overflow = 'hidden';
    return (
        <div className="flex min-h-screen justify-center items-center dark:bg-slate-900 ">
            <div className='text-4xl font-medium'>404 Not Found</div>
        </div>
    );
}

export default NotFound;