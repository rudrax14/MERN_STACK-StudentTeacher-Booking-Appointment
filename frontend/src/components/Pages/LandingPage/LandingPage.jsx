import React from 'react'
import Navbar from '../../UI/Navbar'
import Card from './Card'

function Home() {
    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                <Card />
            </div>
        </>
    )
}

export default Home