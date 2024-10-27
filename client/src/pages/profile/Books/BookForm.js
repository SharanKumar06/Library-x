import { Col, Form, Input, message, Modal, Row } from 'antd'
import React from 'react'
import Button1 from '../../../components/Button1'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader, hideLoader } from '../../../Redux/loaderslice'
import { addBook } from '../../../APIs/Books'



function BookForm({open, setOpen}) {
    const {user}= useSelector(state=> state.users);
    const dispatch= useDispatch();
   const onFinish= async (values)=>{
         try {
            dispatch(showLoader());
            values.createdBy= user._id;
            const res= await addBook(values);
            if(res.success){
                message.success(res.message);
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
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="biography">Biography</option>
                        <option value="self-help">Self-Help</option>
                        <option value="drama">Other</option>
                        <option value="poetry">Other</option>
                        <option value="history">Other</option>
                        <option value="mythology">Other</option>

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