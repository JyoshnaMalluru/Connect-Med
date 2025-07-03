import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import './AllAppointments.css'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='allAppointments'>
      <p className='all-p'>All Appointments</p>
      <div className='all-div'>
        <div className='all-div2'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='each-item' key={index}>
            <p className='each-item-p'>{index+1}</p>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
              <img src={item.userData.image} style={{width:"2rem",height:"2rem",borderRadius:"9999px"}} alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className='dob'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='each-doc'>
              <img src={item.docData.image} className='each-doc-img' alt="" /> <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled ? <p className='cancelled'>Cancelled</p> : item.isCompleted ? <p className='completed'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} style={{width:"2.5rem",cursor:"pointer"}} src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments