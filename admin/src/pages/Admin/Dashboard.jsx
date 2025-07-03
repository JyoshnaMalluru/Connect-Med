import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import './Dashboard.css'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div style={{margin:"1.25rem"}}>

      <div style={{display:"flex",flexWrap:"wrap",gap:"0.75rem"}}>
        <div className='dashboard-card'>
          <img style={{width:"3.5rem"}} src={assets.doctor_icon} alt="" />
          <div>
            <p className='card-txt'>{dashData.doctors}</p>
            <p style={{color: "#9ca3af"}}>Doctors</p>
          </div>
        </div>
        <div className='dashboard-card'>
          <img style={{width:"3.5rem"}} src={assets.appointments_icon} alt="" />
          <div>
            <p className='card-txt'>{dashData.appointments}</p>
            <p style={{color: "#9ca3af"}}>Appointments</p>
          </div>
        </div>
        <div className='dashboard-card'>
          <img style={{width:"3.5rem"}} src={assets.patients_icon} alt="" />
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
              <img style={{borderRadius:"9999px",width:"2.5rem"}} src={item.docData.image} alt="" />
              <div className='table-div'>
                <p style={{color:"#1f2937",fontWeight:"500"}}>{item.docData.name}</p>
                <p style={{color: "#4b5563"}}>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? <p className='cancelled'>Cancelled</p> : item.isCompleted ? <p className='completed'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} style={{width:"2.5rem",cursor:"pointer"}} src={assets.cancel_icon} alt="" />}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard