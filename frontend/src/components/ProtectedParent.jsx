import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { setAuth } from '../redux/slices/authSlice';

const ProtectedParent = () => {
  
    // const [auth , setAuth] = useState(localStorage.getItem("token") ? true : false);
    // useEffect(()=>{
    //   const token = localStorage.getItem("token");
    //   if(token){
    //     const decodedToken = jwtDecode(token);
    //   setRole(decodedToken.role)
    //   setUser(decodedToken);
    //   }
      
    // },[])

    const dispatch = useDispatch();
    
  useEffect(()=>{
    const fetchToken = async ()=>{
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if(token && role){
        const decodedToken = jwtDecode(token);
        dispatch(setAuth({token , role , auth : true , user : decodedToken}))
      }
    }
    fetchToken();
  },[]);

  const { auth , user ,role } = useSelector((state)=>state.auth);
    // const [role ,  setRole] = useState(null);
    // const [user , setUser] = useState(null);
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default ProtectedParent