import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../Redux/loaderslice';
import {  getAllUsers} from '../../../APIs/users';
import { message, Table } from 'antd';
import Button1 from '../../../components/Button1';
import moment from 'moment';


function Users({role}) {
    const [users, setUsers]= React.useState([]);
    const dispatch= useDispatch();
    const GetUsers= async ()=>{
        try {
            dispatch(showLoader());
            const res= await getAllUsers(role);
            dispatch(hideLoader());
            if(res.success){
                setUsers(res.data);
                message.success(res.message);
            }
            else{
                message.error(res.message);
            }
        } catch (error) {
            dispatch(hideLoader());
            message.error(error.message);
        }
    }

    React.useEffect(()=>{
        GetUsers();
    },[])

    const columns= [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
       
        {
           title: 'Created At',
              dataIndex: 'createdAt',
                render: (createdAt)=>
                    moment(createdAt).format('DD/MM/YYYY'),

                
        },

        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (actions, record)=>(
                <div>
                    <Button1 variant='outlined' title='books' />
                </div>
            )

        },
    ]

  return (
    <div>
        <Table columns={columns} dataSource={users}></Table>

    </div>
  )
}

export default Users