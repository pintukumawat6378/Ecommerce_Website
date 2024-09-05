import React, { useEffect } from 'react'
import { Outlet, useNavigate} from 'react-router-dom'
import Navbar from '../sharedComp/Navbar';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({allowedRole}) => {
    
    const navigate = useNavigate();
    

    const {auth , role} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(!auth){
            return navigate("/login")
        }

        if(!allowedRole.includes(role)){
            return  navigate("/");
        }
    },[])
  return (
    <div>
      <Navbar />
      <Outlet /></div>
  )
}

export default ProtectedRoutes