import React from 'react'
import { Link } from 'react-router-dom'

const NavBarBrand = () => {
  return (
    <Link to="/" className='avenge-header align-middle navbar-brand'>
      <img src='/src/components/assets/ootw-64px.png' alt='Logo' className='logo me-3' />
      Order of the Web
    </Link>
  )
}

export default NavBarBrand