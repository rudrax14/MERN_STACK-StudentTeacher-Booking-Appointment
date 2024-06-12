import React from 'react'
import './spinner.css'
function Spinner() {
    return (
        <div className="flex h-screen  justify-center items-center dark:bg-slate-800">

            <span className="loader dark:border-white"></span>

        </div>

    )
}

export default Spinner