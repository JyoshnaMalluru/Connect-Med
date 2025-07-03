import React from 'react'
import { assets } from '../assets/assets'
import "./About.css"
const About = () => {
  return (
    <div>
      <div className='about-head'>
        <p>ABOUT <span className='about-span'>US</span></p>
      </div>
      <div className='about-des'>
        <img className='about-img' src={assets.about_image} alt="" />
        <div className='about-para'>
          <p>Welcome to Connect Med, your trusted partner in managing your healthcare needs conveniently and efficiently. At Connect Med, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Connect Med is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Connect Med is here to support you every step of the way.</p>
          <b className='about-b'>Our Vision</b>
          <p>Our vision at Connect Med is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>
      <div className='about-foot'>
        <p>WHY <span className='about-span2'>CHOOSE US</span></p>
      </div>
      <div className='about-table'>
        <div className='about-each'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='about-each'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='about-each'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About