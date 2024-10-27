import React from 'react'
import Button1 from '../../components/Button1'
import { Button, Flex } from 'antd';


function index() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <div className='text-secondary'>
        <h1 className='text-5xl'>Home</h1>
       
    </div>
  )
}

export default index