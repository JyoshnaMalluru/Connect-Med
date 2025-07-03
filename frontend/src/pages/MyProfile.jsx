import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import "./MyProfile.css"
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const MyProfile = () => {

const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)
const [isEdit,setIsEdit] = useState(false)
const [image,setImage] = useState(false)

const updateUserProfileData = async () => {

        try {
            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
            console.log(formData);
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                // setUserData(data.userData);
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }


  return userData && (
    <div className='myprofile'>
      {
        isEdit?
        <label htmlFor='image'>
          <div style={{display:"inline-block",position:"relative",cursor:"pointer"}}>
            <img className='img-1' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='img-2' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden />
        </label>
        :<img className="myprofile-img" src={userData.image} alt="" />
      }
        
        <br/>
        {
          isEdit
          ? <input type='text' className='myprofile-name' onChange={(e) => setUserData(prev => ({...prev,name:e.target.value}))}  value={userData.name}/>
          : <p className='myprofile-title'>{userData.name}</p>
        }
        <hr className='line' />
        <div>
          <p className='myprofile-contact'>CONTACT INFORMATION</p>
          <div className='contact-info'>
            <p style={{fontSize:"medium"}}>Email Id:</p>
            <p style={{color:"#d9a300"}}>{userData.email}</p>
            <p style={{fontSize:"medium"}}>Phone:</p>
            {
              isEdit
              ? <input className='phone-inp' type='text' value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} />
              : <p style={{color:"#d9a300"}}>{userData.phone}</p>
            }
            <p style={{fontSize:"medium"}}>Address</p>
            {
              isEdit
              ?<p>
                <input style={{backgroundColor:"#f9fafb"}} onChange={(e) => setUserData(prev => ({...prev,address: {...prev.address,line1:e.target.value}}))}  value={userData.address.line1} type='text' />
                <br />
                <input style={{backgroundColor:"#f9fafb"}} onChange={(e) => setUserData(prev => ({...prev,address: {...prev.address,line2:e.target.value}}))}  value={userData.address.line2} type='text' />
              </p>
              :<p style={{color: "#6b7280"}}>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            }
          </div>
        </div>
        <div>
          <p className='myprofile-contact'>BASIC INFORMATION</p>
          <div className='basic-info'> 
            <p style={{fontWeight:"500"}}>Gender:</p>
            {
              isEdit
              ? <select className='select' onChange={(e) => setUserData(prev => ({...prev,gender:e.target.value}))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p style={{color:"#9ca3af",marginLeft:"1.8rem"}}>{userData.gender}</p>
            }
            <p style={{fontWeight:"500"}}>Birthday:</p>
            {
              isEdit 
              ? <input style={{marginLeft:"1.8rem",maxWidth:"8rem",border:"none",backgroundColor:"#f3f4f6"}} onChange={(e) => setUserData(prev => ({...prev,dob:e.target.value}))} type='date' value={userData.dob} />
              :<p style={{color:"#9ca3af",marginLeft:"1.8rem"}}>{userData.dob}</p>
            }
          </div>
        </div>
        <div style={{marginTop:"2.5rem"}}>
          {
            isEdit
            ? <button className='res' onClick={updateUserProfileData}>Save information</button>
            : <button className='res' onClick={()=> setIsEdit(true)}>Edit</button>
          }
        </div>
    </div>
  )
}

export default MyProfile