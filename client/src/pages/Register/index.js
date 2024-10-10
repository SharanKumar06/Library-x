import {  Form } from "antd";
import{ React} from "react";
import {Link} from "react-router-dom";
import Button1 from "../../components/Button1";




function index() {

     const onFinish = (values) => {
        console.log('Success:', values);
     }

  return (
    <div className="h-screen bg-primary flex items-center justify-center ">
      <div className="authentication-form bg-white p-2">
      <h1 class="text-secondary text-2xl font-bold mb-1">Library-X | Register</h1>
           <hr/>
           <Form layout="vertical" onFinish= {onFinish}>

               <Form.Item
               label= "Name"
                name= "name"
               >
                    <input type="text" placeholder="name" />
               </Form.Item>
               <Form.Item
                label= "Email"
                name= "email"
               >
                    <input type="email" placeholder="email" />
               </Form.Item>
               <Form.Item
                label= "Password"
                name= "password"
               >

                    <input type="password" placeholder="password" />
               </Form.Item>
                    <div class="text-center mt-2 flex flex-col gap-1">
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

export default index;
