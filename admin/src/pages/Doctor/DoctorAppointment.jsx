import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import "./DoctorAppointment.css"

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='doc-appintments'>

      <p className='doc-appintments-p'>All Appointments</p>

      <div className='doc-appintments-box'>
        <div className='box-head'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='all-appointments' key={index}>
            <p className='hide-on-small'>{index}</p>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
              <img src={item.userData.image} style={{width:"2rem",borderRadius:"9999px"}} alt="" /> <p>{item.userData.name}</p>
            </div>
            <div>
              <p className='payment-type'>
                {item.payment?'Online':'CASH'}
              </p>
            </div>
            <p className='hide-on-small'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='cancelled'>Cancelled</p>
              : item.isCompleted
                ? <p className='completed'>Completed</p>
                : <div className='flex'>
                  <img onClick={() => cancelAppointment(item._id)} style={{width:"2.5rem",cursor:"pointer"}} src={assets.cancel_icon} alt="" />
                  <img onClick={() => completeAppointment(item._id)} style={{width:"2.5rem",cursor:"pointer"}} src={assets.tick_icon} alt="" />
                </div>
            }
          </div>
        ))}
      </div>

    </div>
  )
}

export default DoctorAppointments