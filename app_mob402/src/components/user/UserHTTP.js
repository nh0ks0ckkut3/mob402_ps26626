import AxiosInstance from "../../http/AxiosInstance";

export const login = async (email, password) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/users/login';
        const body = {
            email: email, 
            password: password,
        }
        return await axiosInstance.post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const signup = async (email, password, name, gender, phone, avatar, age) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url= '/users/register'
        const body ={
            email: email, 
            password: password,
            name: name,
            age: age,
            gender: gender,
            phone: phone,
            avatar: avatar
        }
        return await axiosInstance.post(url, body)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const isExist = async (email) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url= '/users/isExist'
        const body ={
            email: email
        }
        return await axiosInstance.post(url, body)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const forgetPass = async (email) => {
    try {
        const axiosInstance = AxiosInstance();
        const url= '/users/forgetpassword'
        const body ={
            email: email
        }
        return await axiosInstance.post(url, body)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const resetPass = async (email, otp, newpassword) => {
    try {
        const axiosInstance = AxiosInstance();
        const url= `/users/resetpassword`
        const body ={
            email: email,
            otp : otp,
            newpassword : newpassword
        }
        return await axiosInstance.post(url, body)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const changePass = async (id, password, newpassword) => {
    try {
        const axiosInstance = AxiosInstance();
        const url= `/users/changepass/${id}`
        const body ={
            password: password,
            newpassword : newpassword
        }
        return await axiosInstance.post(url, body)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const setPersonInformation = async (_id, phone, imagePath, age, gender) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = `/users/edit/${_id}`;
        const body = {
            avatar: imagePath,
            phone: phone,
            age: age,
            gender:gender
        }
        return await axiosInstance.put(url, body)
    } catch (error) {
        console.log(error);
        throw error;
    }
}