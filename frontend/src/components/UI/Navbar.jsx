import React from 'react';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                        </ul>
                        <ul className='navbar-nav align-items-center ms-auto'>
                            {/* Notification */}
                            <li className='nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications'>
                                <a className='btn btn-icon btn-transparent-dark dropdown-toggle'></a>
                            </li>

                        </ul>
                        {/* <ProfileDropdown /> */}
                        <div className='mx-5'>
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile Name
                                </a>

                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
