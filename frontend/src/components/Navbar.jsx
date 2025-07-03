import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./Navbar.css"
import { AppContext } from '../context/AppContext'
const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu,setShowMenu] = useState(false)
    const [showNav,setShowNav] = useState(false);
    const {token,setToken,userData} = useContext(AppContext);
    const logout = () =>{
        setToken(false)
        localStorage.removeItem('token')
    }

  return (
    <div className='navbar-container'>
        <p onClick={()=>navigate('/')} className="navbar-logo"><i className="fa-regular fa-hospital"></i> Connect Med</p>
        <ul className='navbar-links'>
            <NavLink to='/'>
                <li className='nav-item'>HOME</li>
                <hr className='nav-highlight'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='nav-item'>ALL DOCTORS</li>
                <hr className='nav-highlight'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='nav-item'>ABOUT</li>
                <hr className='nav-highlight'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='nav-item'>CONTACT</li>
                <hr className='nav-highlight'/>
            </NavLink>
        </ul>
        <div className='navbar-actions'>
            {
                token && userData?<div className='profile-container'onClick={()=>setShowMenu(!showMenu)}>
                    <img className='profile-pic' src={userData.image} alt=""/>
                    <img className='dropdown-icon' src={assets.dropdown_icon} alt="" />                        {showMenu && (
                        <div className='dropdown-menu profile-dropdown'>
                            <p onClick={()=> navigate('my-profile')} className='dropdown-item'>My Profile</p>
                            <p onClick={()=> navigate('my-appointments')} className='dropdown-item'>My Appointments</p>
                            <p onClick={logout} className='dropdown-item'>Logout</p>
                        </div>
                        )}
                    </div>
                :<button onClick={()=>navigate('login')} className='create-account-btn'>Create account</button>
            }
            <img onClick={()=> setShowNav(true)} className='small-view' src={assets.menu_icon} alt="" />
            {/* --Mobile Menu--*/}
            <div className={showNav ? 'nav-open' : 'nav-closed'}>
                <div className='mobile-nav'>
                    <p onClick={()=>navigate('/')} className="navbar-logo"><i className="fa-regular fa-hospital"></i> Connect Med</p>
                    <img style={{width:"1.75rem"}} onClick={()=> setShowNav(false)} src={assets.cross_icon} alt=''/>
                </div>
                <ul className='nav-items'>
                    <NavLink onClick={()=> setShowNav(false)} to="/"><p className="nav-links">HOME</p></NavLink>
                    <NavLink onClick={()=> setShowNav(false)} to="/doctors"><p className="nav-links">ALL DOCTORS</p></NavLink>
                    <NavLink onClick={()=> setShowNav(false)} to="/about"><p className="nav-links">ABOUT</p></NavLink>
                    <NavLink onClick={()=> setShowNav(false)} to="contact"><p className="nav-links">CONTACT</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar