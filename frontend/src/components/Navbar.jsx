import React, { useContext,useEffect } from 'react'
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
        localStorage.removeItem('token')
        setToken(false)
        navigate('/login')
    }
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
        }, []);
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
                token && userData?
                <div className='profile-container'>
                    <img className='profile-pic' src={userData.image || assets.default_profile} alt="profile"/>
                    <img className='dropdown-icon' src={assets.dropdown_icon} alt="dropdown" onClick={()=>setShowNav(!showNav)} />                        
                        {showNav?<div className='dropdown-menu profile-dropdown'>
                            <p onClick={()=> navigate('/my-profile')} className='dropdown-item'>My Profile</p>
                            <p onClick={()=> navigate('/my-appointments')} className='dropdown-item'>My Appointments</p>
                            <p onClick={logout} className='dropdown-item'>Logout</p>
                        </div>:<></>}
                    </div>
                 :<button type='button' onClick={() => navigate('/login')} className='create-account-btn'>Create account</button> 
            } 
            <img onClick={()=> setShowMenu(true)} className='small-view' src={assets.menu_icon} alt="" />
            {/* --Mobile Menu--*/}
            <div className={showMenu ? 'nav-open' : 'nav-closed'}>
                <div className='mobile-nav'>
                    <p onClick={()=>navigate('/')} className="navbar-logo"><i className="fa-regular fa-hospital"></i> Connect Med</p>
                    <img style={{width:"1.75rem"}} onClick={()=> setShowMenu(false)} src={assets.cross_icon} alt=''/>
                </div>
                <ul className='nav-items'>
                    <NavLink onClick={()=> setShowMenu(false)} to="/"><p className="nav-links">HOME</p></NavLink>
                    <NavLink onClick={()=> setShowMenu(false)} to="/doctors"><p className="nav-links">ALL DOCTORS</p></NavLink>
                    <NavLink onClick={()=> setShowMenu(false)} to="/about"><p className="nav-links">ABOUT</p></NavLink>
                    <NavLink onClick={()=> setShowMenu(false)} to="/contact"><p className="nav-links">CONTACT</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar