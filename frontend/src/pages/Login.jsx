import React, { useContext, useState,useEffect } from 'react'
import "./Login.css"
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {backendUrl,token,setToken} = useContext(AppContext)
  const [state,setState] = useState("Sign Up")
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const navigate = useNavigate()

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='form'>
       <div className='form-model'>
        <p className='form-head'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment</p>
        {
          state === 'Sign Up' && 
          <div className='form-h'>
            <p>Full Name</p>
            <input className='form-input' type='text' onChange={(e)=>setName(e.target.value)} value={name} />
          </div>
        }
        <div className='form-h'>
          <p>Email</p>
          <input className='form-input' type='email' onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>
        <div className='form-h'>
          <p>Password</p>
          <input className='form-input' type='password' onChange={(e)=>setPassword(e.target.value)} value={password} />
        </div>
        <button type='submit' className='form-btn'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up"
          ? <p>Already have an account? <span onClick={()=> setState('Login')} className='form-end'>Login here</span></p>
          : <p>create a new account? <span onClick={()=> setState('Sign Up')} className='form-end'>click here</span></p>
        }
       </div>
    </form>
  )
}

export default Login