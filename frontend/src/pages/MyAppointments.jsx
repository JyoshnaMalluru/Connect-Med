import './MyAppointments.css'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const {backendUrl, token,getDoctorsData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate(); 
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            if(data.appointments){
              setAppointments(data.appointments.reverse())
            }else{
              setAppointments([]);
            }
            // if (data.appointments) {
            //   // ✅ Filter out cancelled appointments
            //   const activeAppointments = data.appointments.filter(app => !app.cancelled);
            //   setAppointments(activeAppointments.reverse());
            // } else {
            //   setAppointments([]);
            // }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

      try {

              const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
              // console.log(data);
              if (data.success) {
                  toast.success(data.message)
                  getUserAppointments()
                  getDoctorsData()
              } else {
                  toast.error(data.message)
              }

          } catch (error) {
              console.log(error)
              toast.error(error.message)
          }

      }

      const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        getUserAppointments()
                        navigate('/my-appointments')
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
      try {
          const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
          if (data.success) {
              initPay(data.order)
          }else{
              toast.error(data.message)
          }
      } catch (error) {
          console.log(error)
          toast.error(error.message)
      }
    }


    useEffect(() => {
      if (token) {
          getUserAppointments()
      }
    }, [token])

  return (
    <div>
        <p className='appoint-head'>My Appointments</p>
        <div>
          {appointments.slice(0,3).map((item,index) =>(
            <div className='appoint-card' key={index}>
              <div>
                <img style={{width:"8rem",backgroundColor:"#f3edda"}} src={item.docData.image} alt=""/>
              </div>
              <div className='appoint-details'> 
                <p style={{color: "#262626", fontWeight:"600"}} >{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p style={{marginTop: "0.5rem",fontWeight: "500",color: "#3f3f46"}}>Address:</p>
                <p style={{fontSize: "0.75rem",lineHeight: "1rem" }}>{item.docData.address.line1}</p>
                <p style={{fontSize: "0.75rem",lineHeight: "1rem" }}>{item.docData.address.line2}</p>
                <p style={{fontSize: "0.75rem"}}><span style={{fontSize: "0.875rem",lineHeight: "1.25rem",color: "#374151",fontWeight: "500"}}>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='btns'>
                {!item.cancelled && item.payment && !item.isCompleted && <button className='paid-btn'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)}   className='each-btn'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={()=> cancelAppointment(item._id)} className='each-btn btn-2'>Cancel appointment</button>}
                {item.cancelled && !item.isCompleted && <button className='cancelled-btn'>Appointment Cancelled</button>}
                {item.isCompleted && <button className='complete'>Completed</button>}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default MyAppointments