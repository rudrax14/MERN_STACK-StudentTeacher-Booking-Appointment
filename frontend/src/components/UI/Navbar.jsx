import React from 'react';

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-dark bg-dark navbar-expand-sm">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div class="dropdown mx-5">
                            <button class="btn btn-secondary dropdown-toggle mx-3 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </button>
                            <ul class="dropdown-menu me-5">
                                <li><a class="dropdown-item" href="/">Action</a></li>
                                <li><a class="dropdown-item" href="/">Action 1</a></li>
                                <li><a class="dropdown-item" href="/">Action 2</a></li>
                            </ul>
                        </div>
                        {/* <ProfileDropdown /> */}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
