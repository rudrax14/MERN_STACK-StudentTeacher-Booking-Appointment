import React from 'react'
import Navbar from './UI/Navbar'
import Card from './Card'

function Home() {
    return (
        <>
            <Navbar />
            <div className="container position-absolute top-50 start-50 translate-middle">
                <Card />
            </div>
        </>
    )
}

export default Home