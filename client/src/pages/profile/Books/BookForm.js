import { Col, Form, Input, message, Modal, Row } from 'antd'
import React from 'react'
import Button1 from '../../../components/Button1'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader, hideLoader } from '../../../Redux/loaderslice'
import { addBook, updateBook } from '../../../APIs/Books'



function BookForm({open, setOpen, reloadBooks, selectedBook, formType}) {
    const {user}= useSelector(state=> state.users);
    const dispatch= useDispatch();

   const onFinish= async (values)=>{
         try {
            dispatch(showLoader());
            values.createdBy= user._id;
            if(formType === 'edit'){
                values._id= selectedBook._id;
                const res= await updateBook(values);
                if(res.success){
                    message.success(res.message);
                    reloadBooks();
                    dispatch(hideLoader());
                    return setOpen(false);
                }
                else{
                    dispatch(hideLoader());
                    message.error(res.message);
                    return setOpen(false);
                }
            }
            const res= await addBook(values);
            if(res.success){
                message.success(res.message);
                reloadBooks();
            }
            else{
                message.error(res.message);
            }
            dispatch(hideLoader());
            setOpen(false);
            
         } catch (error) {
                dispatch(hideLoader());
            message.error(error.message);
         }
    }
  return (
    <Modal
    title="Add Book"
    open= {open}
    onCancel={()=>setOpen(false)}
    centered
    width={800}
    footer={null}
    >


    <Form
        layout= "vertical"
        onFinish= {onFinish}
        initialValues={{
            ...selectedBook,
            publishedDate: selectedBook?.publishedDate ? new Date(selectedBook.publishedDate).toISOString().split('T')[0] : null
        }}
        
    >
        <Row gutter={[20,20]}>
            <Col span={24}>
                <Form.Item label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title of book!' }]}
                >
                    <input type='text' />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label='Description'
                    name='description'
                    rules={[{ required: true, message: 'Please input the description of book!' }]}
                >
                   <textarea name="" id="" />
                </Form.Item>
            </Col>
            
            <Col span= {24}>
                <Form.Item label='Image URL'
                    name='image'
                    rules={[{ required: true, message: 'Please input the image url of book!' }]}
                >
                    <input type='text' />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label='Author'
                    name='author'
                    rules={[{ required: true, message: 'Please input the author of book!' }]}
                >
                    <input type='text' />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label='published date'
                    name='publishedDate'
                    rules={[{ required: true, message: 'Please input the published date of book!' }]}
                >
                    <input type='date' />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label= 'Publisher'
                    name='publisher'
                    rules={[{ required: true, message: 'Please input the publisher of book!' }]}
                >
                    <input type='text' />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item label='Category'
                    name='category'
                    rules={[{ required: true, message: 'Please input the category of book!' }]}
                >
                    <select name="" id="">
                        <option value="">categories</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="biography">Biography</option>
                        <option value="self-help">Self-Help</option>
                        <option value="drama">Drama</option>
                        <option value="poetry">Poetry</option>
                        <option value="history">History</option>
                        <option value="mythology">mythology</option>

                    </select>
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item label='Rent per day'
                    name='rentPerDay'
                    rules={[{ required: true, message: 'Please input the rent per day of book!' }]}
                >
                    <input type='number' />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label='Total copies'
                    name='totalCopies'
                    rules={[{ required: true, message: 'Please input the total copies of book!' }]}
                >
                    <input type='number' />
                </Form.Item>
            </Col>

        </Row>

        <div className="flex justify-end gap-2 ">
            <Button1 type="button" variant='outlined' title= "cancel" onClick= {()=>setOpen(false)} />
            <Button1 type="submit" title= "save" />
        </div>


    </Form>

    </Modal>
  )
}

export default BookForm