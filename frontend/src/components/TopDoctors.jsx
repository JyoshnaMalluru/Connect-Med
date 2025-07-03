import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import "./TopDoctors.css"
import { AppContext } from '../context/AppContext';

export const TopDoctors = () => {
   const navigate =  useNavigate();
   const {doctors} = useContext(AppContext);

  return (
    <div className='topdoctors-info'>
        <h1 className='topdoctors-heading'>Top Doctors to Book</h1>
        <p className='topdoctors-para'>Simply browse through our extensive list of trusted doctors</p>
        <div className='topdoctors-list'>
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='topdoctors-card' key={index}>
                    <img className='card-img' src={item.image} alt=''/>
                    <div className='card-avail'>
                        <div className={item.available?'card-p0':'card-p1'}>
                            <p className={item.available?'card-p2':'card-p3'}></p>
                            <p>{item.available ? 'Available' : "Not Available"}</p>
                        </div>
                        <p className='card-title'>{item.name}</p>
                        <p className='card-specific'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate(`/doctors`); scrollTo(0,0)}} className='more-btn'>more</button>
    </div>
  )
}
