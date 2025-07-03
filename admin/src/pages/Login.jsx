import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  // console.log(backendUrl);
  const navigate = useNavigate();


  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
        navigate('/admin-dashboard')
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      console.log(data.token);
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
        navigate('/doctor-dashboard')
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='login-form'> 
      <div className='form-div'>
        <p className='form-txt'><span style={{color:"#d9a300"}}>{state}</span> Login</p>
        <div style={{width:"100%"}}>
          <p style={{margin:"2px"}}>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='form-inp' type="email" required />
        </div>
        <div style={{width:"100%"}}>
          <p style={{margin:"2px"}}>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='form-inp' type="password" required />
        </div>
        <button className='form-btn'>Login</button>
        {
          state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='form-link'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='form-link'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login