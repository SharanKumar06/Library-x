import {  Form, message } from "antd";
import{ React} from "react";
import {Link} from "react-router-dom";
import Button1 from "../../components/Button1";
import { registerUser } from "../../APIs/users";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../Redux/loaderslice";



function Register(){
     const dispatch= useDispatch();
     const onFinish= async (values) => {
        try{
            dispatch(showLoader());
             const res= await registerUser(values);
             dispatch(hideLoader());
             if(res.success){
                  await message.success(res.message);
                    window.location= '/login';
               }
               else {
                    message.error(res.message);
               }
          }
          catch(e){
               message.error(e.response.data.message);
          }
     }


  return (
    <div className="h-screen bg-primary flex items-center justify-center ">
      <div className="authentication-form bg-white rounded p-2">
      <h1 className="text-secondary text-2xl font-bold mb-1">Library-X | Register</h1>
           <hr/>
           <Form layout="vertical" onFinish= {onFinish}>

               <Form.Item
               label= "Name"
                name= "name"
                rules={
                    [
                        { required: true,
                         message: "Name is required"},
                    ]
                   }
               >
                    <input type="text" placeholder="name" />
               </Form.Item>
               <Form.Item
                label= "Email"
                name= "email"
                rules={
                    [
                        { required: true,
                         message: "Email is required"},
                    ]
                   }
               >
                    <input type="email" placeholder="email" />
               </Form.Item>
               <Form.Item
                    label= "Phone"
                    name= "phone"
                    rules={
                         [
                             { required: true,
                              message: "Field is required"},
                         ]
                        }
               >
                    <input type="text" placeholder="phone number" />
               </Form.Item>

               <Form.Item
                label= "Password"
                name= "password"
                rules={
                    [
                        { required: true,
                         message: "password is required"},
                    ]
                   }
               >

                    <input type="password" placeholder="password" />
               </Form.Item>
                    <div className="text-center mt-2 flex flex-col gap-1">
                     <Button1 title= "Register" type="submit" />
                         <Link to="/login"
                         className="text-primary text-sm underline"
                         >Already have an account? Click here to Login</Link>
                    </div>
           </Form>
      </div>
    </div>
  );
}

export default Register;
