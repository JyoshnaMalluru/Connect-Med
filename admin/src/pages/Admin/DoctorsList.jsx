import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import './DoctorsList.css'

const DoctorsList = () => {

  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <div className='doctors-list'>
      <h1 className='list-head'>All Doctors</h1>
      <div className='list'>
        {doctors.map((item, index) => (
          <div className='card-container' key={index}>
            <img className='card' src={item.image} alt="" />
            <div style={{padding:"1rem"}}>
              <p className='card-name'>{item.name}</p>
              <p className='card-speciality'>{item.speciality}</p>
              <div className='doc-info'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList