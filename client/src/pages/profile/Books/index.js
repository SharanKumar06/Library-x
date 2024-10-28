import React, { useState } from 'react'
import Button1 from '../../../components/Button1'
import BookForm from './BookForm';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../Redux/loaderslice';
import { deleteBook, getAllBooks } from '../../../APIs/Books';
import { message, Table } from 'antd';
import 'remixicon/fonts/remixicon.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function Books() {
  const [formType, setFormType]= useState('add');
  const [selectedBook, setSelectedBook]= useState(null);
  const [openBookForm , setOpenBookForm]= React.useState(false);
  const [books, setBooks]= React.useState([]);
  const dispatch= useDispatch();

  const DeleteBook= async(id)=>{
    try {
      dispatch(showLoader());
      const res= await deleteBook(id);
      dispatch(hideLoader());
      if(res.success){
        message.success(res.message);
        getallbooks();
      }
      else{
        message.error(res.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      message.error(error.message);
    }
  }

  const getallbooks= async ()=>{
    try {
      dispatch(showLoader());
      const res= await getAllBooks();
      dispatch(hideLoader());
      if(res.success){
        setBooks(res.data);
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
    getallbooks();
  },[])

  const columns = [
    {
      title: 'Book',
      dataIndex: 'image',
      render: (image)=> <img src={image} alt="book" style={{width: '60px', height: '80px'}} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'category',
      dataIndex: 'category',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'publisher',
      dataIndex: 'publisher',
    },
    {
      title: 'total copies',
      dataIndex: 'totalCopies',
    },
    {
      title: 'available copies',
      dataIndex: 'availableCopies',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text,record)=>(
        <div className='flex gap-1'>
          <AiFillEdit 
            onClick={()=>{
              setFormType('edit');
              setSelectedBook(record);
              setOpenBookForm(true);
            }}
          />
          <AiFillDelete 
            onClick={()=>{DeleteBook(record._id)}}
          />
        </div>
      )
    },
  ];


  return (
    <div>
        <div class="flex justify-end">
            <Button1 title='Add Book' onClick={()=>{ 
              setOpenBookForm(true)
              setFormType('add')
              setSelectedBook(null)
              }} />
        </div>

        <Table columns= {columns} dataSource= {books} className='mt-1'></Table>
        
      {openBookForm && <BookForm open={openBookForm} setOpen={setOpenBookForm} formType= {formType} selectedBook= {selectedBook} reloadBooks= {getallbooks}  />}

    </div>
  )
}

export default Books