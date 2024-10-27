import { axiosInstance } from "./axiosinstance";

//get all books
export const addBook = async (payload) => {
        try {
            const res= await axiosInstance.post("/api/books/addBook",payload);
            return res.data;
            
        } catch (error) {
            throw error;
        }
    }

