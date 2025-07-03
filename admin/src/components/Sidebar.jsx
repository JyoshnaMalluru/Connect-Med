import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import './Sidebar.css'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='sidebar'>
      {aToken && <ul>

        <NavLink to={'/admin-dashboard'} className={({ isActive }) =>`sidebar-items  ${isActive ? 'active' : ''}` }>
          <img className='sidebar-img' src={assets.home_icon} alt='' />
          <p className='side-items'>Dashboard</p>
        </NavLink>
        <NavLink to={'/all-appointments'} className={({ isActive }) =>`sidebar-items  ${isActive ? 'active' : ''}` }>
          <img className='sidebar-img' src={assets.appointment_icon} alt='' />
          <p className='side-items'>Appointments</p>
        </NavLink>
        <NavLink to={'/add-doctor'} className={({ isActive }) =>`sidebar-items  ${isActive ? 'active' : ''}` }>
          <img className='sidebar-img' src={assets.add_icon} alt='' />
          <p className='side-items'>Add Doctor</p>
        </NavLink>
        <NavLink to={'/doctor-list'} className={({ isActive }) =>`sidebar-items  ${isActive ? 'active' : ''}` }>
          <img className='sidebar-img' src={assets.people_icon} alt='' />
          <p className='side-items'>Doctors List</p>
        </NavLink>
      </ul>}

      {dToken && <ul>
        <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `sidebar-items  ${isActive ? 'active' : ''}` }>
          <img className='sidebar-img' src={assets.home_icon} alt='' />
          <p className='side-items'>Dashboard</p>
        </NavLink>
        <NavLink to={'/doctor-appointments'} className={({ isActive }) => `sidebar-items  ${isActive ? 'active' : ''}` }>
          <img className='sidebar-img' src={assets.appointment_icon} alt='' />
          <p className='side-items'>Appointments</p>
        </NavLink>
        <NavLink to={'/doctor-profile'} className={({ isActive }) => `sidebar-items  ${isActive ? 'active' : ''}` }>
          <img className='sidebar-img' src={assets.people_icon} alt='' />
          <p className='side-items'>Profile</p>
        </NavLink>
      </ul>}
    </div>
  )
}

export default Sidebar