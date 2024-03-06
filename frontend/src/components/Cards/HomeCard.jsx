import React from 'react'
import capitalizeName from '../capitalizeName'


function HomeCard({ img, name }) {
    return (
        <div className="col-sm-10 col-md-6 col-lg-4 my-3">
            <div className="card">
                <img
                    src={img}
                    className="card-img-top"
                    alt={capitalizeName(name)}
                />
                <div className="card-body text-center">
                    <h5 className="card-title">{capitalizeName(name)}</h5>
                    <a href={`/${name}/login`} className="btn btn-primary">
                        Let's Go
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HomeCard