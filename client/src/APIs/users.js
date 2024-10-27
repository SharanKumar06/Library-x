import { axiosInstance } from "./axiosinstance";

//resgister a user

export const registerUser = async (payload) => {
  try {
    console.log("in registerUser");
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;

  } catch (e) {
    console.log(e.response.data);
    return e.response.data;
  }
};

export const loginUser = async (payload) => {

    try {
        console.log("in loginUser");
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;
    
    } catch (e) {
        console.log(e.response.data);
        return e.response.data;
    }
    }

    //get User details

export const getUserDetails= async()=>{
  try{
      console.log("in getUserDetails");
      const response= await axiosInstance.get("/api/users/getUserDetails");
      return response.data;
  }
  catch(e){
      throw (e);
  }
}
