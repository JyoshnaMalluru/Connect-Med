import React from 'react'
import { assets } from '../assets/assets'
import "./Banner.css"
import { useNavigate } from 'react-router-dom'

export default function () {
    const navigate= useNavigate()
  return (
    <div className='banner'>
        {/* ---left side--- */}
        <div className='banner-left'>
            <div className='banner-txt'>
                <p>Book Appointment</p>
                <p className='txt'>With 100+ Trusted Doctors</p>
            </div>
            <button onClick={()=>navigate(`/login`)} className='create-btn'>Create account</button>
        </div>
        {/* ---right side--- */}
        <div className='banner-right'>
            <img  className='banner-img' src={assets.appointment_img} alt='' />
        </div>
    </div>
  )
}
