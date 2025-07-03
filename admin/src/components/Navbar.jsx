import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='admin-navbar'>
      <div className='nav-div'>
        {/* <img onClick={() => navigate('/')} className='nav-img' src={assets.admin_logo} alt="" /> */}
        <div>
            <p onClick={()=>navigate('/')} className="navbar-logo"><i className="fa-regular fa-hospital"></i> Connect Med</p>
            <p style={{fontWeight:"500",marginTop:"0rem",textAlign: "center",color:"#d9a300"}}>Dashboard Panel</p>
        </div>
            <p className='nav-p'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={() => logout()} className='nav-btn'>Logout</button>
    </div>
  )
}

export default Navbar