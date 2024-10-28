import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserDetails } from '../APIs/users'
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Redux/usersSlice';
import { hideLoader, showLoader } from '../Redux/loaderslice';
import { FaUserAstronaut } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import '../stylesheets/alignments.css'
import '../stylesheets/sizes.css'
import '../stylesheets/theme.css'
import '../stylesheets/form_elements.css'
import '../stylesheets/custom-components.css'


function ProtectedRoute({children}) {
    const Navigate= useNavigate();
    const {user}= useSelector(state=>state.users);
    const dispatch= useDispatch();
  

    const validateUserToken= async()=>{
         try {
           dispatch(showLoader());
          const response= await getUserDetails();
          dispatch(hideLoader());
            if(response.success)
            {
              dispatch(setUser(response.data));
            }
            else {
              message.error(response.message);
            }

         }
         catch(e){
             localStorage.removeItem('token');
              window.location= '/login';
         }
    }

   useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      window.location= '/login';
    }
        validateUserToken();
   },[]);

  return (
    <div>
      {
        user && 
        <>
        <div className='p-2 '>
          <div className="header p-3 bg-primary flex rounded justify-between items-center">
            <h1 className="text-2xl text-white font-bold pointer" onClick={()=>Navigate('/')}>LIBRARY-X</h1>
            <div className="flex items-center bg-white text-primary font-bold">
            <div className="flex items-center gap-1 p-1">
              <FaUserAstronaut/>
              <span onClick={()=> Navigate('/profile')} className="text-sm underline pointer">{user.name.toUpperCase()}</span>
              <IoMdLogOut className='ml-2' onClick={()=>{
                localStorage.removeItem('token');
                window.location= '/login';
              }} />
            </div>
            </div> 
          </div>
          <div className="content mt-1">{children}</div>
         
        </div>
        </>
      }
    </div>
  )
}

export default ProtectedRoute