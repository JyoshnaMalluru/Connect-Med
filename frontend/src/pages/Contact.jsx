import React from 'react'
import "./Contact.css"
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div>
        <div className='contact'>
          <p>CONTACT <span className='contact-span'>US</span></p>
        </div>
        <div className='contact-info'>
          <img className='contact-img' src={assets.contact_image} alt="" />
          <div className='contact-para'>
            <p className='contact-head'>OUR OFFICE</p>
            <p className='contact-d'>54709 Willms Station <br/>Suite 350, Washington, USA</p>
            <p className='contact-d'>Tel: (415) 555‑0132<br/>Email: connectmed@gmail.com </p>
            <p className='contact-head'>Careers at Connect Med</p>
            <p className='contact-d'>Learn more about our teams and job openings.</p>
            <button className='contact-btn'>Explore Jobs</button>
          </div>
        </div>
    </div>
  )
}

export default Contact