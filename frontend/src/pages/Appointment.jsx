import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import "./Appointment.css"
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios';
import { toast } from 'react-toastify';


const Appointment = () => {
  const {docId}=useParams()
  const {doctors,currencySymbol,backendUrl,token,getDoctorsData} = useContext(AppContext)
  const daysOfWeek = ['SUN','MON','TUES','WEDNES','THURS','FRI','SATUR']
  const [docInfo,setDocInfo] = useState(null)
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')
  const navigate = useNavigate();
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    // console.log(docInfo)
  }

  const getAvailableSlots = async () => {
  //   setDocSlots([])
  //   //getting curr date
  //   let today = new Date()
  //   // console.log(today)
  //   for(let i=0;i<7;i++){
  //     //getting date with index
  //     let currDate = new Date(today)
  //     currDate.setDate(today.getDate()+i)

  //     //setting end time of the date with index
  //     let endTime= new Date()
  //     endTime.setDate(today.getDate()+i)
  //     endTime.setHours(21,0,0,0)

  //     //setting hours
  //     if(today.getDate() === currDate.getDate()){
  //       currDate.setHours(currDate.getHours()>10?currDate.getHours()+1:10)
  //       currDate.setMinutes(currDate.getMinutes()>30?30:0)
  //     }else{
  //       currDate.setHours(10)
  //       currDate.setMinutes(0)
  //     }
  //     let timeSlots = []
  //     while(currDate<endTime){
  //       let formattedTime = currDate.toLocaleTimeString([],{hour: '2-digit',minute:'2-digit'})

  //       let day = currDate.getDate()
  //       let month = currDate.getMonth()+1
  //       let year = currDate.getFullYear()

  //       const slotDate = day + "_" + month + "_" + year
  //       const slotTime = formattedTime
  //       const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
  //       if (isSlotAvailable) {
  //       // add slot to array
  //         timeSlots.push({
  //           datetime:new Date(currDate),
  //           time:formattedTime
  //         })
  //       }
  // //       if (timeSlots.length === 0) {
  // // // Push a dummy slot just for displaying date/day
  // //         timeSlots.push({
  // //           datetime: currDate,
  // //           time: null
  // //         });
  // //       }

  //       //Increment current time by 30 minutes
  //       currDate.setMinutes(currDate.getMinutes()+30)
  //       }
  //     setDocSlots(prev => ([...prev,timeSlots]))
  //   }



  if (!docInfo) return;

  const allDaysSlots = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const slotsForDay = [];
    const currentDay = new Date(today);
    currentDay.setDate(today.getDate() + i);

    const startTime = new Date(currentDay);
    startTime.setHours(10, 0, 0, 0);

    const endTime = new Date(currentDay);
    endTime.setHours(21, 0, 0, 0);

    if (i === 0) {
      const now = new Date();
      if (now.getHours() >= 10) {
        startTime.setHours(now.getHours() + 1);
        startTime.setMinutes(now.getMinutes() > 30 ? 0 : 30);
      }
    }

    const currTime = new Date(startTime);
    while (currTime < endTime) {
      const formattedTime = currTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const day = currTime.getDate();
      const month = currTime.getMonth() + 1;
      const year = currTime.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const isSlotAvailable = !(
        docInfo.slots_booked &&
        docInfo.slots_booked[slotDate] &&
        docInfo.slots_booked[slotDate].includes(formattedTime)
      );

      if (isSlotAvailable) {
        slotsForDay.push({
          datetime: new Date(currTime),
          time: formattedTime
        });
      }

      currTime.setMinutes(currTime.getMinutes() + 30);
    }

    allDaysSlots.push(slotsForDay);
  }

  setDocSlots(allDaysSlots);

  }

  const bookAppointment = async () => {

    if (!token) {
        toast.warning('Login to book appointment')
        return navigate('/login')
    }

    if (!slotTime) {
      toast.warning('Please select a time slot first.');
      return;
    }
    
    const date = docSlots[slotIndex][0].datetime
    if (!date) {
      toast.warning('Invalid date selected.');
      return;
    }
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {

        const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
        if (data.success) {
            toast.success(data.message)
            getDoctorsData()
            navigate('/my-appointments')
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }

}


  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])

  useEffect(()=>{
    getAvailableSlots()
  },[docInfo])

  useEffect(()=>{
    // console.log(docSlots);
  },[docSlots])
  return docInfo && (
    <div>
       {/* ---Doctor Details--- */}
       <div className='doc-details'>
        <div>
          <img className='doc-img' src={docInfo.image} alt="" />
        </div>
        <div className='doc-card'>
          <p className='info'>
            {docInfo.name}
            <img className='icon' src={assets.verified_icon} alt=''/>
          </p>
          <div className='doc-info'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='exp-btn'>{docInfo.experience}</button>
          </div>
          <div className='d-about'>
            <p className='doc-about'>About <img src={assets.info_icon} alt="" /></p>
            <p className='about'>{docInfo.about}</p>
          </div>
          <div>
            <p className='doc-fee'>
              Appointment fee: <span className='doc-fees'>{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>
        {/* ----Booking slots --- */}
        <div className='booking-slots'>
          <p>Booking Slots</p>
          <div className='slots'>
            {
              docSlots.length && docSlots.map((item,index)=>(
                <div className={`time-slot ${slotIndex === index ? 'active' : 'inactive'}`} key={index} onClick={() => setSlotIndex(index)}>
                  <p>{item[0]?.datetime ? daysOfWeek[item[0].datetime.getDay()] : 'Today'}</p>
                  <p>{item[0]?.datetime ? item[0].datetime.getDate() : 'No Slots'}</p>
                </div>
              ))
            }
          </div>
          <div className='all-times'>
            {docSlots.length && docSlots[slotIndex].map((item,index) => (
              <p onClick={()=>setSlotTime(item.time)} className={`time ${item.time === slotTime ? 'active' : 'inactive'}`}  key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button onClick={bookAppointment} className='appoint-btn'>Book an appointment</button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment