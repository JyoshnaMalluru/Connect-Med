import { createContext } from "react";
import { doctors } from "../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";
import { useState,useEffect } from "react";

export const AppContext = createContext()
const AppContextProvider =(props) =>{
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData, setUserData] = useState(false)

    // Getting Doctors using API
    const getDoctorsData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            // console.log(data)
            if (data.success) {
                // console.log(data.userData)
                setUserData(data.userData)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])

    const value={
        doctors,
        currencySymbol,
        getDoctorsData,
        backendUrl,
        token,setToken,
        userData, setUserData, loadUserProfileData
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider