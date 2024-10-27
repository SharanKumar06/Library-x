import {  Form, message } from "antd";
import{ React, useEffect} from "react";
import {Link} from "react-router-dom";
import Button1 from "../../components/Button1";
import { loginUser } from "../../APIs/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../Redux/loaderslice";

function Login() {

     const navigate= useNavigate();
     const dispatch= useDispatch();

  const onFinish= async (values) => {
    try{
         dispatch(showLoader()); 
         const res= await loginUser(values);
         dispatch(hideLoader());
         if(res.success){
              localStorage.setItem("token", res.data);
              await message.success(res.message);
              window.location= '/';
           }
           else {
                message.error(res.message);
           }
      }
      catch(e){
           message.error(e.response.data.message);
      }
  }

  useEffect(()=>{
     const token = localStorage.getItem('token');
     if(token){
           window.location= '/';
     }
  })

  return (
    <div className="h-screen bg-primary flex items-center justify-center ">
    <div className="authentication-form bg-white p-2 rounded">
    <h1 className="text-secondary text-2xl font-bold mb-1">Library-X | Login</h1>
         <hr/>
         <Form layout="vertical" onFinish= {onFinish}>

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
              label= "Password"
              name= "password"
              rules={
               [
                   { required: true,
                    message: "Password is required"},
               ]
              }
             >

                  <input type="password" placeholder="password" />
             </Form.Item>
                  <div className="text-center mt-2 flex flex-col gap-1">
                   <Button1 title= "Login" type="submit" fullWidth= {true} />
                       <Link to="/register"
                       className="text-primary text-sm underline"
                       >No account? create userselves one!!</Link>
                  </div>
         </Form>
    </div>
  </div>
  )
}

export default Login