import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import './AddDoctor.css'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)
    console.log(backendUrl)
    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            // console log formdata            
            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            console.log(backendUrl + '/api/admin/add-doctor')

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }
  return (
    <form onSubmit={onSubmitHandler} style={{margin:"1.25rem",width:"100vw"}}>

            <p className='form-p'>Add Doctor</p>

            <div className='form-adddoc'>
                <div className='form-div1'>
                    <label htmlFor="doc-img">
                        <img className='form-img' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden />
                    <p>Upload doctor <br /> picture</p>
                </div>

                <div className='form-all'>

                    <div className='form-info'>

                        <div className='form-input'>
                            <p>Your name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='inp' type="text" placeholder='Name' required />
                        </div>

                        <div className='form-input'>
                            <p>Doctor Email</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='inp' type="email" placeholder='Email' required />
                        </div>


                        <div className='form-input'>
                            <p>Set Password</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='inp' type="password" placeholder='Password' required />
                        </div>

                        <div className='form-input'>
                            <p>Experience</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='inp small' >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="7 Year">7 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10 Years</option>
                            </select>
                        </div>

                        <div className='form-input'>
                            <p>Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='inp' type="number" placeholder='Doctor fees' required />
                        </div>

                    </div>

                    <div className='form-speciality'>

                        <div className='form-input'>
                            <p>Speciality</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='inp small'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>


                        <div className='form-input'>
                            <p>Degree</p>
                            <input onChange={e => setDegree(e.target.value)} value={degree} className='inp' type="text" placeholder='Degree' required />
                        </div>

                        <div className='form-input'>
                            <p>Address</p>
                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='inp' type="text" placeholder='Address 1' required />
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='inp' type="text" placeholder='Address 2' required />
                        </div>

                    </div>
                </div>

                <div>
                    <p style={{marginBottom:'0.5rem',marginTop:'1rem'}}>About Doctor</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='text-area' rows={5} placeholder='write about doctor'></textarea>
                </div>
                <button type='submit' className='form-btn'>Add doctor</button>
            </div>
        </form>
  )
}

export default AddDoctor