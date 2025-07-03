import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <div className='footer'>
        <div className='left'>
            {/* left */}
            <div>
                <p className="logo"><i className="fa-regular fa-hospital"></i> Connect Med</p>
                <p className='left-info'>Connect Med is a hospital management web application designed to simplify patient–doctor interactions. It allows patients to book, reschedule, or cancel appointments online.</p>
            </div>
            {/* center */}
            <div>
                <p className='center'>COMPANY</p>
                <ul className='center-list'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/* Right */}
            <div>
                <p className='center'>GET IN TOUCH</p>
                <ul className='center-list'>
                    <li>+0-000-000-000</li>
                    <li>connectmed@gmail.com</li>
                </ul>
            </div>
        </div>
    {/* copyright */}
            <div>
                <hr />
                <p className='copyright'>Copyright 2024 @connectmed - All Right Reserved.</p>
            </div>
    </div>
  )
}

export default Footer