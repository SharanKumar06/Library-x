import { message, Modal } from 'antd'
import React from 'react'
import Button1 from '../../../components/Button1'
import { getUserById } from '../../../APIs/users';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../Redux/loaderslice';
import moment from 'moment';
import { set } from 'mongoose';
import { IssueBook, UpdateIssue } from '../../../APIs/Books';



function IssueForm({
    open,setOpen, selectedBook, type, selectedIssue, getIssues
}) {

    const {user}= useSelector(state=>state.users);
    const [errorMsg, setErrorMsg]= React.useState(null);
    const [validated, setValidated]= React.useState(false);
    const [patronId, setPatronId]= React.useState(type === 'edit' ? selectedIssue.issuedTo._id : '');
    
    const [ReturnDate, setReturnDate]= React.useState('');
    const dispatch= useDispatch();
    const [patron, setPatron]= React.useState(null);

    const onUpdate= async()=>{
        try {
            dispatch(showLoader());
            const res= await UpdateIssue({
                id: selectedIssue._id,
                returnDate: ReturnDate
            });
            dispatch(hideLoader());
            if(res.success){
                message.success(res.message);
                setOpen(false);
                getIssues();
            }
            else{
                message.error(res.message);
            }
        } catch (error) {
            dispatch(hideLoader());
            message.error(error.message);
        }
    }




    const validate= async ()=>{
      try{  
        dispatch(showLoader());
        const res = await getUserById(patronId);
        console.log(res.data);
        dispatch(hideLoader());
        if(!res.success){
            setPatron(null);
            setErrorMsg(res.message);
            setValidated(false);
            return;
        }
        if(res.data.role !== 'patron'){
            setPatron(null);
            setErrorMsg('User is not a patron');
            setValidated(false);
            return;
        }
        setPatron(res.data);
        setErrorMsg(null);
        setValidated(true);
        console.log(moment(ReturnDate).diff(moment(), 'days')*selectedBook.rentPerDay);
    }
    catch(e){
        setPatron(null);
        dispatch(hideLoader());
        setErrorMsg(e.message);
    }
    }

    const onIssue= async ()=>{
        try {
            dispatch(showLoader());
            const res= await IssueBook({
                book: selectedBook._id,
                issuedTo: patron._id,
                issuedBy: user._id,
                issueDate: moment().format('YYYY-MM-DD'),
                returnDate: ReturnDate,
                rent: moment(ReturnDate).diff(moment(), 'days')*selectedBook.rentPerDay
            });
            dispatch(hideLoader());
            if(res.success){
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
    

  return (
    <Modal 
        
        open= {open}
        onCancel={()=>setOpen(false)}
        footer={null}
        width={500}
    >
        <div class="flex flex-col items-center gap-2">
            <h1 className='text-secondary font-bold text-xl uppercase'>Isuue Book</h1>

            <input className=' rounded  ' type='text' value={patronId} onChange={(e)=>setPatronId(e.target.value)}  placeholder='Patron Id'  />
            <input className=' rounded ' type= "date" value={ReturnDate} onChange={(e)=>setReturnDate(e.target.value)} min={moment().format("YYYY-MM-DD")} placeholder='return date'/>
            {errorMsg && <p className='error-message'>{errorMsg}</p>}
            <div class="flex justify-end gap-2 w-100 ">
                <Button1 title="Validate"  variant='outlined ' onClick={()=>validate()}/>
                
                <Button1 title= { (type==='edit')? "Update" : "Issue" } variant="contained" disabled={!validated} onClick={ (type==='edit')? ()=> {onUpdate()} : ()=>{onIssue()}} />                
            </div>
        </div>
    </Modal>
  )
}

export default IssueForm