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

export const IssueBook = async(payload)=>{
    try {
        const res= await axiosInstance.post("/api/Issues/IssueBook",payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}


export const getIssues = async()=>{
    try {
        const res= await axiosInstance.get("/api/Issues/getIssues");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getIssuesByBook= async(id)=>{
    try {
        const res= await axiosInstance.get(`/api/Issues/getIssuesByBook/${id}`);
        return res.data;
    } catch (error) {
        throw error
    }
}

export const returnBook= async(payload)=>{
    try {
        const res= await axiosInstance.post(`/api/Issues/returnBook`, payload);
        return res.data;
    } catch (error) {
        throw error
    }
}

export const getIssuesByUser= async(id)=>{
    try {
        const res= await axiosInstance.get(`/api/Issues/getIssuesByUser/${id}`);
        return res.data;
    } catch (error) {
        throw error
    }
}

export const DeleteIssue= async(payload)=>{
    try {
        const res= await axiosInstance.post(`/api/Issues/deleteIssue`, payload);
        return res.data;
    } catch (error) {
        throw error
    }
}

export const UpdateIssue= async(payload)=>{
    try {
        const res= await axiosInstance.post(`/api/Issues/editIssue`, payload);
        return res.data;
    } catch (error) {
        throw error
    }
}


