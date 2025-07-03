import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import './DoctorDashboard.css'
const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)


  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])

  return dashData && (
    <div style={{margin:"1.25rem"}}>

      <div style={{display:"flex",flexWrap:"wrap",gap:"0.75rem"}}>
        <div className='dashboard-card'>
          <img tyle={{width:"3.5rem"}} src={assets.earning_icon} alt="" />
          <div>
            <p className='card-txt'>{currency} {dashData.earnings}</p>
            <p style={{color: "#9ca3af"}}>Earnings</p>
          </div>
        </div>
        <div className='dashboard-card'>
          <img tyle={{width:"3.5rem"}} src={assets.appointments_icon} alt="" />
          <div>
            <p className='card-txt'>{dashData.appointments}</p>
            <p style={{color: "#9ca3af"}}>Appointments</p>
          </div>
        </div>
        <div className='dashboard-card'>
          <img tyle={{width:"3.5rem"}} src={assets.patients_icon} alt="" />
          <div>
            <p className='card-txt'>{dashData.patients}</p>
            <p style={{color: "#9ca3af"}}>Patients</p></div>
        </div>
      </div>

      <div style={{backgroundColor:"white"}}>
        <div className='bookings'>
          <img src={assets.list_icon} alt="" />
          <p style={{fontWeight: "600"}}>Latest Bookings</p>
        </div>

        <div className='latest-bookings'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='table' key={index}>
              <img style={{borderRadius:"9999px",width:"2.5rem"}} src={item.userData.image} alt="" />
              <div className='table-div'>
                <p style={{color:"#1f2937",fontWeight:"500"}}>{item.userData.name}</p>
                <p style={{color: "#4b5563"}}>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='cancelled'>Cancelled</p>
                : item.isCompleted
                  ? <p className='completed'>Completed</p>
                  : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} style={{width:"2.5rem",cursor:"pointer"}}  src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} style={{width:"2.5rem",cursor:"pointer"}}  src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard