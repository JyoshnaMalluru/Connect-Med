import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import "./Doctors.css"

const Doctors = () => {
   const navigate= useNavigate()
  const {speciality} = useParams()
  const [filterDoc,setFilterDoc]=useState([])
  const [showFilter,setShowFilter] = useState(true);
  const {doctors} = useContext(AppContext)

  const applyFilter =() => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])

  return (
    <div>
       <p className='txt'>Browse through the doctors specialist.</p>
       <div className='all-list'>
        <button className={showFilter?'filter-btn1':'filter-btn2'} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
         <div className={`all-specialists ${showFilter ? 'show' : 'hide'}`}>
          <p  onClick={()=> speciality === 'General physician'? navigate('/doctors'):navigate('/doctors/General physician')} className={`each-specialist ${
                speciality === "General physician" ? "general-physician" : ""
            }`}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist'? navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`each-specialist ${
                speciality === "Gynecologist" ? "gynecologist" : ""
            }`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist'? navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`each-specialist ${
                speciality === "Dermatologist" ? "dermatologist" : ""
            }`}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians'? navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`each-specialist ${
                speciality === "Pediatricians" ? "pediatricians" : ""
            }`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist'? navigate('/doctors'):navigate('/doctors/Neurologist')} className={`each-specialist ${
                speciality === "Neurologist" ? "neurologist" : ""
            }`}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist'? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`each-specialist ${
                speciality === "Gastroenterologist" ? "gastroenterologist" : ""
            }`}>Gastroenterologist</p>
         </div>
         <div className='doc-list'>
          {
            filterDoc.map((item,index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='topdoctors-card' key={index}>
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
          ))
          }
         </div>
       </div>
    </div>
  )
}

export default Doctors