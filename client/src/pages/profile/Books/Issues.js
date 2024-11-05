import { Button, message, Modal, Table } from 'antd'
import React, { useEffect } from 'react'
import { getIssuesByBook, returnBook } from '../../../APIs/Books';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../Redux/loaderslice';
import moment from 'moment';
import Button1 from '../../../components/Button1';

function Issues(
   { open ,
    setOpen ,
    selectedBook }
) {

  const handleReturn= async(issue)=>{
    try {
      dispatch(showLoader());
      issue.returnedDate= new Date();
      const fine= (moment(issue.returnedDate).diff(moment(issue.returnDate), 'days')) * issue.rent;
      fine>0 ? issue.fine= fine : issue.fine= 0;
      const res= await returnBook(issue);
      dispatch(hideLoader());
      await GetIssues();
      if(res.success){
        message.success(res.message);
      }
    }
    catch(e){
      dispatch(hideLoader());
      message.error(e.message)
    }
  }

  const [issues, setIssues]= React.useState(null);  
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      render: (_id)=> _id.slice(_id.length-5)
    },
    {
      title: 'Patron/ user',
      dataIndex: 'issuedTo',
      render : (issuedTo)=> issuedTo.name
    },
    {
      title: 'rent',
      dataIndex: 'rent'
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      render: (issueDate)=> moment(issueDate).format('YYYY-MM-DD')
    },
    {
      title: 'Due Date',
      dataIndex: 'returnDate',
      render: (returnDate)=> moment(returnDate).format('YYYY-MM-DD')
    },
    
    {
      title: 'fine',
      dataIndex: 'fine'
    },
    {
      title: 'Returned Date',
      dataIndex: 'returnedDate',
      render: (text, record)=> (record.returnedDate) ? moment(record.returnedDate).format('YYYY-MM-DD') : <Button1 variant= "outlined" title="Return" onClick={()=>{handleReturn(record)}}  ></Button1>
    }
  ]  

  const GetIssues= async ()=>{
    try
      {
        dispatch(showLoader());
      const res= await getIssuesByBook(selectedBook._id);
      dispatch(hideLoader());
      if(res.success){
          setIssues(res.data)
          console.log(res.data[0].issuedTo)
      }
    
     }
    catch(e){
      dispatch(hideLoader());
      message.error(e.message)
    }
  }

  useEffect(()=> {GetIssues()},[])

  return (
    <Modal  open= {open} onCancel= {()=> setOpen(false)}
    footer={null}
    width={1200}
    >
      <h1 className="mt-1 mb-1 text-xl  font-bold text-secondary" style={{textAlign: 'center',}}>Issues of {selectedBook.title}</h1>
        <Table 
        dataSource={issues}
        columns={columns}
        >

        </Table>

    </Modal>
  )
}

export default Issues