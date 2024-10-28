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

export const getAllBooks = async () => {
    try {
        const res = await axiosInstance.get("/api/books/getAllBooks");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateBook = async (payload) => {
    try {
        const res = await axiosInstance.put("/api/books/update-book", payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const deleteBook = async (id) => {
    try {
        const res = await axiosInstance.delete(`/api/books/delete-book/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}


