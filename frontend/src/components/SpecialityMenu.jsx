import React from 'react';
import { specialityData } from '../assets/assets';
import './SpecialityMenu.css';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className="speciality-menu" id="speciality">
      <h1 className="speciality-menu-title">Find by Speciality</h1>
      <p className="speciality-menu-description">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      <div className="speciality-menu-items">
        {specialityData.map((item, index) => (
          <Link onClick={()=>scroll(0,0)} key={index} to={`/doctors/${item.speciality}`} className="speciality-menu-item">
            <img
              src={item.image}
              alt={item.speciality}
              className="speciality-menu-image"
            />
            <p className="speciality-menu-label">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
