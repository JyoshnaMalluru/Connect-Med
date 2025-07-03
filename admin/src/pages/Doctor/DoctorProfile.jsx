import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import './DoctorProfile.css'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div>
            <div className='doc-profile'>
                <div>
                    <img className='profile-img' src={profileData.image} alt="" />
                </div>

                <div className='doc-info'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='doc-name'>{profileData.name}</p>
                    <div className='doc-edu'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='doc-exp'>{profileData.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='about'>About :</p>
                        <p className='doc-description'>
                            {
                                isEdit
                                    ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text'  className="about-textarea" rows={5} value={profileData.about} />
                                    : profileData.about
                            }
                        </p>
                    </div>

                    <p className='doc-fee'>
                        Appointment fee: <span style={{color: "#1f2937"}}>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
                    </p>

                    <div className='doc-address'>
                        <p>Address:</p>
                        <p style={{fontSize: "0.875rem",lineHeight: "1.25rem"}}>
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
                        </p>
                    </div>

                    <div className='doc-avail'>
                        <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label htmlFor="">Available</label>
                    </div>

                    {
                        isEdit
                            ? <button onClick={updateProfile} className='btns'>Save</button>
                            : <button onClick={() => setIsEdit(prev => !prev)} className='btns'>Edit</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile