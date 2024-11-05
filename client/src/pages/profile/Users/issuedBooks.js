import { message, Modal, Table } from 'antd'
import React from 'react'
import { DeleteIssue, getIssuesByUser, returnBook } from '../../../APIs/Books';
import moment from 'moment';
import Button1 from '../../../components/Button1';
import IssueForm from '../Books/IssueForm';

function IssuedBooks({open,setOpen, selectedUser}) {
    const [openIssueForm, setOpenIssueForm]= React.useState(false);
    const [issues, setIssues]= React.useState(null);
    const [selectedIssue, setSelectedIssue]= React.useState(null);
    // const [selectedBook, setSelectedBook]= React.useState(null);
    const getIssues= async()=>{
        try {
            const res= await getIssuesByUser(selectedUser._id);
            setIssues(res.data);
        
        } catch (error) {
            message.error(error.message);
        }
    }

    const handleReturn= async(issue)=>{
        try {
            issue.returnedDate= new Date();
            const fine= (moment(issue.returnedDate).diff(moment(issue.returnDate), 'days')) * issue.rent;
            fine>0 ? issue.fine= fine : issue.fine= 0;
            const res= await returnBook(issue);
            if(res.success){
                message.success(res.message);
                getIssues();
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    const handleDelete= async(record)=>{
        try {
            const res= await DeleteIssue(record);
            
            if(res.success){
                message.success(res.message);
                getIssues();
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    const handleEdit= async(record)=>{
        try {
            const res= await DeleteIssue(record);
            
            if(res.success){
                message.success(res.message);
                getIssues();
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    React.useEffect(()=>{
        getIssues();
    },[]);

   const  columns= [
        {
            title: 'S.No',
            dataIndex: '_id',
            render: (_id)=> _id.slice(_id.length-5)
            
        },
        {
            title: 'Book',
            dataIndex: 'book',
            render: (book)=> book.title
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
            title: 'Returned Date',
            dataIndex: 'returnedDate',
            render: (returnedDate)=> returnedDate ? moment(returnedDate).format('YYYY-MM-DD') : "Not Returned"
        },
        {
            title: 'Fine',
            dataIndex: 'fine'
        },
        {
            title: 'Action',
            render: (record)=> record.returnedDate ? moment(record.returnedDate).format('YYYY-MM-DD') : <Button1 onClick={()=> handleReturn(record)} title="Return" variant="outlined"/>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record)=>(
                 
                    <div>
                        <Button1 title="Delete" onClick={()=> {handleDelete(record)}} variant="outlined"/>
                        <Button1 title="Edit" onClick={()=> {setOpenIssueForm(true); setSelectedIssue(record)}} variant="outlined"/>
                    </div>
                 
            )
        }
    ]

  return (
    <div>
           <Modal
        open= {open}
        onCancel= {()=> setOpen(false)}
        footer= {null}
        width={1200}
    >
        <h1 className="mt-1 mb-1 text-xl  font-bold text-secondary text-uppercase" style={{textAlign: 'center',}}>Issues of {selectedUser.name}</h1>

        <Table
            columns= {columns}
            dataSource= {issues}
            
        >

        </Table>

        
    </Modal> 
    {openIssueForm && <IssueForm open={openIssueForm} setOpen={setOpenIssueForm} selectedUser={selectedUser} selectedIssue={selectedIssue} selectedBook={selectedIssue.book} getIssues={getIssues} type="edit"/>}
    </div>
  )
}

export default IssuedBooks