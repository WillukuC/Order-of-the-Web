import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import NavBarBrand from './NavBarBrand'
import UserProfilePage from '../pages/UserProfilePage'

export const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-light'>
        <div className="container-fluid">
            <NavBarBrand/>
            <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label='Toggle navigation'>
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id='navbarSupportedContent'>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className="nav-item" to={UserProfilePage}></Link>
                    <li className="nav-item"></li>
                    <li className="nav-item"></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
