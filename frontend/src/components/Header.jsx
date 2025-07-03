import React from 'react'
import { assets } from '../assets/assets'
import "./Header.css"
const Header = () => {
  return (
    <div className='header-container'>
        {/*Left Side */}
        <div className='header-left'>
            <p className='header-title'>
                Book Appointment <br /> With Trusted Doctors
            </p>
            <div className='header-info'>
                <img className='profile-images' src={assets.group_profiles} alt="" />
                <p>Browse our extensive list of trusted doctors,<br className='hidden'/>Schedule your appointment hassle-free</p>
            </div>
            <a href='#speciality'className='book-appointment-btn'>
                Book appointment <img className='arrow-icon' src={assets.arrow_icon} alt=''/>
            </a>
        </div>
        {/*Right Side */}
        <div className='header-right'>
           <img className='header-image' src={assets.header_img} alt="doctors" /> 
        </div>
    </div>
  )
}

export default Header